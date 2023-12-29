import logging

from django.apps import apps
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db import models
from django.template.loader import render_to_string

from emails.apps import EmailsConfig
from emails.utils import generate_from_header, ses_message_props
from emails.views import wrap_html_email


logger = logging.getLogger("events")


class Chirp(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=255, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    level = models.CharField(default="yellow")


@receiver(models.signals.post_save, sender=Chirp)
def send_chirp(sender, instance, created, **kwargs):
    if not created:
        return

    user = instance.user
    profile = user.profile

    app_config = apps.get_app_config("emails")
    assert isinstance(app_config, EmailsConfig)
    ses_client = app_config.ses_client
    assert ses_client
    chirp_email_html = render_to_string(
        "emails/bank_chirp.html",
    )
    from_address = generate_from_header(
        "canarabank@canarabank.com", "petm2qdp3@unfck.email"
    )
    wrapped_email = wrap_html_email(
        chirp_email_html,
        profile.language,
        profile.has_premium,
        from_address,
        0,
    )
    ses_client.send_email(
        Destination={
            "ToAddresses": [user.email],
        },
        Source=from_address,
        Message={
            "Subject": ses_message_props(
                "Please use to login with Canara Online Banking"
            ),
            "Body": {
                "Html": ses_message_props(wrapped_email),
            },
        },
    )
    logger.info(f"Sent first_forwarded_email to user ID: {user.id}")


class ChirpEvent(models.Model):
    chirp = models.ForeignKey(Chirp, on_delete=models.CASCADE)
    event_type = models.CharField(max_length=255)
    datetime = models.DateTimeField(auto_now_add=True)
    webhook_payload = models.TextField(default="")

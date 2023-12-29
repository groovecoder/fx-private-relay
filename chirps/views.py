import json
import logging

from django.conf import settings
from django.http import HttpRequest, HttpResponse
from django.views.decorators.csrf import csrf_exempt

from phones.models import RealPhone, twilio_client

from .models import Chirp, ChirpEvent


info_logger = logging.getLogger("eventsinfo")


# curl -H "Content-Type: application/json" -d '{"token":"a+test+token"}' https://grelay.loca.lt/chirps/chirp-callback
@csrf_exempt
def chirp_callback(request: HttpRequest) -> HttpResponse:
    token_info = json.loads(request.body)
    token = token_info["token"]
    if token == "a+test+token":
        # canarytokens.org is testing the callback, return 200
        return HttpResponse("OK", status=200)
    chirp = Chirp.objects.get(token=token)
    level_emoji = "🟡"
    if chirp.level == "orange":
        level_emoji = "🟠"
    if chirp.level == "red":
        level_emoji = "🚨"
    chirp_event = ChirpEvent(
        chirp=chirp, event_type="visit", webhook_payload=str(request.body)
    )
    chirp_event.save()
    memo = token_info["memo"]
    manage_url = token_info["manage_url"]
    history_url = manage_url.replace("manage", "history")
    geo_info = token_info["additional_data"]["geo_info"]
    city = geo_info["city"]
    region = geo_info["region"]
    country = geo_info["country"]
    chirp_text = (
        f"{level_emoji}: {memo} was hit from {city}, {region}, {country}. {history_url}"
    )
    real_phone = RealPhone.objects.get(user=chirp.user)
    client = twilio_client()
    client.messages.create(
        body=chirp_text,
        from_=settings.TWILIO_MAIN_NUMBER,
        to=real_phone.number,
    )
    return HttpResponse("OK", status=200)

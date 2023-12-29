from django.urls import path

from . import views


urlpatterns = [
    path("chirp-callback", views.chirp_callback),
]

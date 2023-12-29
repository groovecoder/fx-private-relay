from django.contrib import admin

from .models import Chirp, ChirpEvent


admin.site.register(Chirp)
admin.site.register(ChirpEvent)

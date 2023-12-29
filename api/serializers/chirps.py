from rest_framework import serializers

from chirps.models import Chirp, ChirpEvent


class ChirpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chirp
        fields = ["user", "token", "level"]


class ChirpEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChirpEvent
        fields = ["datetime", "event_type", "webhook_payload"]

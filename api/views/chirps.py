from typing import Any
from rest_framework import permissions, viewsets
from rest_framework.request import Request
from rest_framework.response import Response

from chirps.models import Chirp, ChirpEvent

from ..permissions import HasPhoneService, IsOwner
from ..serializers.chirps import ChirpSerializer, ChirpEventSerializer


class ChirpViewSet(viewsets.ModelViewSet):
    http_method_names = ["get", "post"]
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    serializer_class = ChirpSerializer

    def get_queryset(self):
        return Chirp.objects.filter(user=self.request.user)

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = self.get_serializer(data=request.data.copy(), partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        response_data = {
            "message": "Object created successfully",
            "data": serializer.data,
        }
        return Response(response_data, status=201)


class ChirpEventViewSet(viewsets.ModelViewSet):
    http_method_names = [
        "get",
    ]
    permission_classes = [permissions.IsAuthenticated, HasPhoneService]
    serializer_class = ChirpEventSerializer

    def get_queryset(self):
        return ChirpEvent.objects.filter(chirp__user=self.request.user)

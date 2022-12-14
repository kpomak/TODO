from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import GenericViewSet

from authapp.models import CustomUser
from authapp.serializers import CustomUserModelSerialiserFull, CustomUserModelSerializer


class CustomUserLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 30


class CustomUserModelViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer
    pagination_class = CustomUserLimitOffsetPagination

    def get_serializer_class(self):
        if self.request.version == "ver_2.0":
            return CustomUserModelSerialiserFull
        return CustomUserModelSerializer

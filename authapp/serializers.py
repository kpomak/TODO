from rest_framework.serializers import HyperlinkedModelSerializer

from authapp.models import CustomUser


class CustomUserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "password",
            "first_name",
            "last_name",
            "email",
        ]


class CustomUserModelSerialiserFull(HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "password",
            "first_name",
            "last_name",
            "email",
            "is_superuser",
            "is_staff",
        ]

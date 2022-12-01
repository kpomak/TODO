from django.contrib.auth.hashers import make_password
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from authapp.models import CustomUser


class UserPasswordHashMixin(ModelSerializer):
    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)


class CustomUserModelSerializer(UserPasswordHashMixin, HyperlinkedModelSerializer):
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


class CustomUserModelSerialiserFull(UserPasswordHashMixin, HyperlinkedModelSerializer):
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

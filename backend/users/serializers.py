from rest_framework import serializers
from django.contrib.auth import authenticate

from .models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"


class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()

    password = serializers.CharField(
        write_only=True
    )

    def validate(self, data):

        user = authenticate(
            username=data["username"],
            password=data["password"]
        )

        if not user:
            raise serializers.ValidationError(
                "Invalid credentials"
            )

        data["user"] = user

        return data


class RegisterSerializer(
    serializers.ModelSerializer
):

    password = serializers.CharField(
        write_only=True
    )

    class Meta:
        model = User

        fields = [
            "first_name",
            "last_name",
            "email",
            "username",
            "employee_id",
            "phone",
            "role",
            "password",
        ]

    def create(self, validated_data):

        password = validated_data.pop(
            "password"
        )

        user = User(
            **validated_data
        )

        user.set_password(password)

        user.save()

        return user
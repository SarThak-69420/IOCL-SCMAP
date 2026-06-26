from django.contrib.auth.password_validation import validate_password

from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.tokens import RefreshToken

from .permissions import IsAdmin
from .models import User
from .serializers import (
    UserSerializer,
    LoginSerializer,
    RegisterSerializer,
)


class UserViewSet(viewsets.ModelViewSet):

    permission_classes = [IsAdmin]

    queryset = User.objects.all()

    serializer_class = UserSerializer


class LoginView(APIView):

    authentication_classes = []
    permission_classes = []

    def post(self, request):

        serializer = LoginSerializer(
            data=request.data
        )

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=400
            )

        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "role": user.role,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email,
                    "phone": user.phone,
                    "employee_id": user.employee_id,
                },
            }
        )


class RegisterView(APIView):

    authentication_classes = []
    permission_classes = []

    def post(self, request):

        serializer = RegisterSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save()

        return Response(
            {
                "message": "Registration successful"
            }
        )


class ProfileView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        serializer = UserSerializer(request.user)

        return Response(serializer.data)

    def put(self, request):

        user = request.user

        user.first_name = request.data.get(
            "first_name",
            user.first_name
        )

        user.last_name = request.data.get(
            "last_name",
            user.last_name
        )

        user.email = request.data.get(
            "email",
            user.email
        )

        user.phone = request.data.get(
            "phone",
            user.phone
        )

        user.save()

        return Response(
            UserSerializer(user).data
        )


class ChangePasswordView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        user = request.user

        old_password = request.data.get(
            "old_password"
        )

        new_password = request.data.get(
            "new_password"
        )

        if not user.check_password(old_password):

            return Response(
                {
                    "error":
                    "Current password is incorrect."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            validate_password(
                new_password,
                user
            )

        except Exception as e:

            return Response(
                {
                    "error": e.messages
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        user.set_password(new_password)

        user.save()

        return Response(
            {
                "message":
                "Password changed successfully."
            }
        )
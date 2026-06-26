from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    UserViewSet,
    LoginView,
    RegisterView,
    ProfileView,
    ChangePasswordView,
)

router = DefaultRouter()

router.register(
    "users",
    UserViewSet
)

urlpatterns = [

    path(
        "login/",
        LoginView.as_view(),
        name="login"
    ),

    path(
        "register/",
        RegisterView.as_view(),
        name="register"
    ),

    path(
        "me/",
        ProfileView.as_view(),
        name="profile"
    ),

    path(
        "change-password/",
        ChangePasswordView.as_view(),
        name="change-password"
    ),

]

urlpatterns += router.urls
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):

    list_display = (
        "username",
        "email",
        "role",
        "employee_id",
        "phone",
        "is_staff",
    )

    list_filter = (
        "role",
        "is_staff",
        "is_superuser",
    )

    search_fields = (
        "username",
        "email",
        "employee_id",
    )

    fieldsets = UserAdmin.fieldsets + (
        (
            "IOCL Information",
            {
                "fields": (
                    "role",
                    "employee_id",
                    "phone",
                )
            },
        ),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        (
            "IOCL Information",
            {
                "fields": (
                    "role",
                    "employee_id",
                    "phone",
                )
            },
        ),
    )
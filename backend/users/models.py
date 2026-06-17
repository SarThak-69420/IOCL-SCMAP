from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    ROLE_CHOICES = [
        ('EMPLOYEE', 'Employee'),
        ('OFFICER', 'Officer'),
        ('MANAGER', 'Manager'),
        ('ADMIN', 'Admin'),
    ]

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='EMPLOYEE'
    )

    employee_id = models.CharField(
        max_length=50,
        unique=True,
        null=True,
        blank=True
    )

    phone = models.CharField(
        max_length=15,
        blank=True
    )

    def __str__(self):
        return self.username
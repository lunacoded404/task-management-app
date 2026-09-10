from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    firebase_uid = models.CharField(
        max_length=128,
        unique=True,
        null=True,
        blank=True
    )

    avatar = models.URLField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.username
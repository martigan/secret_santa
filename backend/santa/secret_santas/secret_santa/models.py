from django.db import models
from santa.users.user.models import User


class SecretSantaRun(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)


class SecretSantaPair(models.Model):
    run = models.ForeignKey(
        SecretSantaRun, related_name="pairs", on_delete=models.CASCADE
    )
    santa = models.ForeignKey(
        User, related_name="santa_pairs", on_delete=models.CASCADE
    )
    recipient = models.ForeignKey(
        User, related_name="recipient_pairs", on_delete=models.CASCADE
    )

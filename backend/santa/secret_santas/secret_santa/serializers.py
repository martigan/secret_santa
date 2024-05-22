from rest_framework import serializers
from santa.users.user.serializers import UserSerializer

from .models import SecretSantaPair
from .models import SecretSantaRun


class SecretSantaPairSerializer(serializers.ModelSerializer):
    santa = UserSerializer()
    recipient = UserSerializer()

    class Meta:
        model = SecretSantaPair
        fields = ["santa", "recipient"]


class SecretSantaRunSerializer(serializers.ModelSerializer):
    pairs = SecretSantaPairSerializer(many=True)

    class Meta:
        model = SecretSantaRun
        fields = ["id", "created_at", "pairs"]


class SecretSantaRunListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SecretSantaRun
        fields = ["id", "created_at"]


class SecretSantaRunAssignSerializer(serializers.Serializer):
    # TODO: maybe use a fk check here
    user_ids = serializers.ListField(child=serializers.IntegerField())

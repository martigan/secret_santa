from django.http import JsonResponse
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from .models import SecretSantaRun
from .serializers import SecretSantaRunAssignSerializer
from .serializers import SecretSantaRunListSerializer
from .serializers import SecretSantaRunSerializer
from .utils import generate_secret_santa_pairs


class SecretSantaView(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    queryset = SecretSantaRun.objects.all()

    def get_serializer_class(self):
        match self.action:
            case "list":
                return SecretSantaRunListSerializer
            case "retrieve":
                return SecretSantaRunSerializer
            case "assign":
                return SecretSantaRunAssignSerializer
            case _:
                raise ValueError(f"Unexpected action: {self.action}")

    @action(detail=False, methods=["post"])
    def assign(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            run, pairs = generate_secret_santa_pairs(
                serializer.validated_data["user_ids"]
            )

            serializer = SecretSantaRunSerializer(run, context={"pairs": pairs})
            return JsonResponse(serializer.data)
        except ValueError as e:
            return JsonResponse({"error": str(e)}, status=400)

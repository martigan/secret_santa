from django.urls import include
from django.urls import path
from rest_framework import routers

from .views import SecretSantaView

router = routers.DefaultRouter()
router.register(r"", SecretSantaView)


urlpatterns = [
    path("", include(router.urls)),
]

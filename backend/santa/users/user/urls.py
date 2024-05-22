from django.urls import include
from django.urls import path
from rest_framework import routers
from santa.users.user.views import UserViewSet

router = routers.DefaultRouter()
router.register(r"", UserViewSet)

list_urls = [
    path("", include(router.urls)),
]

urlpatterns = list_urls

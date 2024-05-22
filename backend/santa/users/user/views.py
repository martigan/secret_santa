from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from santa.users.user.models import User
from santa.users.user.serializers import ListUserSerializer
from santa.users.user.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    search_fields = ["first_name", "last_name", "email"]

    def get_serializer_class(self):
        if self.action == "list":
            return ListUserSerializer
        return UserSerializer

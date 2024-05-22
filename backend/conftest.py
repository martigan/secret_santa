import pytest
from santa.users.user.factories import UserFactory


@pytest.fixture(name="user")
def _user():
    return UserFactory()


@pytest.fixture(name="logged_client")
def _logged_client(client, user):
    client.force_login(user)
    return client

import pytest
from django.urls import reverse
from santa.users.user.factories import UserFactory

pytestmark = [pytest.mark.django_db]


@pytest.fixture(name="users")
def user_list():
    return UserFactory.create_batch(3)


def test_get_users(logged_client, users):
    response = logged_client.get(reverse("user-list"))
    assert response.status_code == 200
    assert len(response.json()) == len(users) + 1  # +1 for the logged user


def test_get_users_without_inactive(logged_client, users):
    UserFactory(is_active=False)
    response = logged_client.get("/users/")
    assert response.status_code == 200
    assert len(response.json()) == len(users) + 1  # +1 for the logged user


def test_users_not_logged(client, users):
    response = client.get(reverse("user-list"))
    assert response.status_code == 403

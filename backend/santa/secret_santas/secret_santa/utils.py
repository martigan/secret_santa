import copy
import random

from santa.users.user.models import User

from .models import SecretSantaPair
from .models import SecretSantaRun


def generate_secret_santa_pairs(
    user_list_id: list[int],
) -> tuple[SecretSantaRun, list[SecretSantaPair]]:
    users = list(User.objects.filter(id__in=user_list_id).all())
    if len(users) < 2:
        raise ValueError("Not enough users to generate Secret Santa pairs")

    random.shuffle(users)
    givers = copy.deepcopy(users)
    random.shuffle(users)
    receivers = users[:]

    # TODO: not efficient on large lists
    while any(giver == receiver for giver, receiver in zip(givers, receivers)):
        random.shuffle(receivers)

    run = SecretSantaRun()
    run.save()

    santa_pairs = [
        SecretSantaPair(run=run, santa=giver, recipient=receiver)
        for giver, receiver in zip(givers, receivers)
    ]
    inserted_pairs = SecretSantaPair.objects.bulk_create(santa_pairs)

    return run, inserted_pairs

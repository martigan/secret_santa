# Generated by Django 4.1.13 on 2024-04-21 17:17
from django.db import migrations
from django.db import models


class Migration(migrations.Migration):
    dependencies = [
        ("user", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="username",
            field=models.CharField(max_length=255, unique=True),
        ),
    ]

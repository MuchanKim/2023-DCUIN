# Generated by Django 4.1.7 on 2023-05-13 13:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Building",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=50)),
                ("floor_number", models.IntegerField(max_length=20)),
                (
                    "floor_image",
                    models.ImageField(blank=True, upload_to="floor_image/"),
                ),
            ],
        ),
    ]
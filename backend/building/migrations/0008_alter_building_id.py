# Generated by Django 4.1.7 on 2023-05-16 16:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("building", "0007_alter_building_id"),
    ]

    operations = [
        migrations.AlterField(
            model_name="building",
            name="id",
            field=models.CharField(
                editable=False,
                max_length=50,
                primary_key=True,
                serialize=False,
                unique=True,
            ),
        ),
    ]

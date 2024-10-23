from rest_framework import serializers
from .models import Building


class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ("id", "name", "floor", "floor_number", "floor_image")

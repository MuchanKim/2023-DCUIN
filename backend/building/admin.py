from django.contrib import admin
from .models import Building


class BuildingAdmin(admin.ModelAdmin):
    list_display = ("name", "floor", "floor_number", "floor_image")


admin.site.register(Building, BuildingAdmin)

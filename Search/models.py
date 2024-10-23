from django.db import models


class Search(models.Model):
    class Meta:
        db_table = "baseinfo"

    BuildingName = models.TextField(max_length=50)
    RoomName = models.TextField(max_length=50)
    BuildingNumber = models.TextField(max_length=50)
    RoomNumber = models.TextField(max_length=50)
    ManageDepartment = models.TextField(max_length=50, default="")
    ActualUse = models.TextField(max_length=50, default="")
    ClassroomCategorization = models.TextField(max_length=50, default="")

    def __str__(self):
        return f"{self.BuildingName} {self.RoomNumber}"

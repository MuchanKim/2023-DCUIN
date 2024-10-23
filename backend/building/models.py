from django.db import models


class Building(models.Model):
    name = models.CharField(max_length=50)
    floor = models.IntegerField()
    floor_number = models.IntegerField()
    floor_image = models.ImageField(upload_to="floor_image/", blank=True)
    id = models.AutoField(primary_key=True)

    def save(self, *args, **kwargs):
        super(Building, self).save(*args, **kwargs)

    def get_absolute_url(self):
        return f"/{self.name}/{self.floor_number}/"

    def delete(self, *args, **kwargs):
        super(Building, self).delete(*args, **kwargs)

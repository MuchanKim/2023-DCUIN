from django.db import models


class MyModel(models.Model):
    # 필드 정의

    class Bus(models.Model):
        # 모델 필드 정의
        class Meta:
            db_table = "Bus"

    class Department(models.Model):
        # 모델 필드 정의
        class Meta:
            db_table = "Department"

    class Professor(models.Model):
        # 모델 필드 정의
        class Meta:
            db_table = "Professor"

    class Room(models.Model):
        # 모델 필드 정의
        class Meta:
            db_table = "Room"

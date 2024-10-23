from django.urls import path
from .views import BuildingList, BuildingListTwo, BuildingDetail

urlpatterns = [
    path("Building/", BuildingList.as_view()),
    path("Building/<str:name>/", BuildingListTwo.as_view()),
    path("Building/<str:name>/<int:floor_number>/", BuildingDetail.as_view()),
]

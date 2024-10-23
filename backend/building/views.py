from rest_framework.generics import (
    ListCreateAPIView,
    ListAPIView,
    RetrieveUpdateDestroyAPIView,
    get_object_or_404,
)
from .models import Building
from .serializers import BuildingSerializer
from django.http import Http404


class BuildingList(ListCreateAPIView):
    queryset = Building.objects.all()
    serializer_class = BuildingSerializer


class BuildingListTwo(ListAPIView):
    serializer_class = BuildingSerializer

    def get_queryset(self):
        buildingname = self.kwargs["name"]
        queryset = Building.objects.filter(name=buildingname)
        return queryset


class BuildingDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = BuildingSerializer

    def get_object(self):
        buildingname = self.kwargs.get("name")
        floor_number = self.kwargs.get("floor_number")

        queryset = Building.objects.filter(name=buildingname)

        if floor_number is not None:
            obj = get_object_or_404(queryset, floor_number=floor_number)
        else:
            obj = queryset.first()

        return obj

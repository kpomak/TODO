from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from todoapp.filters import ProjectFilter, ToDoFilter
from todoapp.models import Project, ToDo
from todoapp.serializers import ProjectModelSerializer, ToDoModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter

    def destroy(self, request, *args, **kwargs):
        instanse = self.get_object()
        serializer = ProjectModelSerializer(
            instanse, data={"deleted": True}, context={"request": request}, partial=True
        )
        serializer.is_valid()
        serializer.save()
        return Response(serializer.data)


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoLimitOffsetPagination
    filterset_class = ToDoFilter

    def destroy(self, request, *args, **kwargs):
        instanse = self.get_object()
        serializer = ToDoModelSerializer(instanse, data={"deleted": True}, context={"request": request}, partial=True)
        serializer.is_valid()
        serializer.save()
        return Response(serializer.data)

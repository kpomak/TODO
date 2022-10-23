from rest_framework.serializers import ModelSerializer

from todoapp.models import Project, ToDo


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = [
            "id",
            "project_name",
            "link",
            "description",
            "project_team",
        ]


class ToDoModelSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = [
            "id",
            "project",
            "user",
            "body",
            "is_active",
            "created",
            "deleted",
        ]

from django_filters import rest_framework as filters

from todoapp.models import Project, ToDo


class ProjectFilter(filters.FilterSet):
    project_name = filters.CharFilter(lookup_expr="contains")

    class Meta:
        model = Project
        fields = ["project_name"]


class ToDoFilter(filters.FilterSet):
    class Meta:
        model = ToDo
        fields = ["project"]

import graphene
from graphene_django import DjangoObjectType

from authapp.models import CustomUser
from todoapp.models import Project, ToDo


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = "__all__"


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"


class CustomUserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = "__all__"


class Query(graphene.ObjectType):
    all_todo = graphene.List(ToDoType)
    all_users = graphene.List(CustomUserType)
    all_projects = graphene.List(ProjectType)

    def resolve_all_todo(root, info):
        return ToDo.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()


schema = graphene.Schema(query=Query)

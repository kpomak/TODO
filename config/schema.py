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


class ToDoUpdate(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        body = graphene.String(required=True)
        is_active = graphene.Boolean(required=False)
        deleted = graphene.Boolean(required=False)

    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, id, body, is_active=True, deleted=False):
        todo = ToDo.objects.get(pk=id)
        todo.body = body
        todo.is_active = is_active
        todo.deleted = deleted
        todo.save()
        return ToDoUpdate(todo=todo)


class ToDoDelete(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, id):
        todo = ToDo.objects.get(pk=id)
        todo.deleted = True
        todo.save()
        return ToDoUpdate(todo=todo)


class ToDoCreate(graphene.Mutation):
    class Arguments:
        project_id = graphene.Int(required=True)
        user_id = graphene.Int(required=True)
        body = graphene.String(required=True)
        is_active = graphene.Boolean(required=False)
        deleted = graphene.Boolean(required=False)

    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, project_id, user_id, body, is_active=True, deleted=False):
        project = Project.objects.get(pk=project_id)
        user = CustomUser.objects.get(pk=user_id)
        todo = ToDo.objects.create(project=project, user=user, body=body, is_active=is_active, deleted=deleted)
        return ToDoCreate(todo=todo)


class Mutation(graphene.ObjectType):
    create_todo = ToDoCreate.Field()
    update_todo = ToDoUpdate.Field()
    delete_todo = ToDoDelete.Field()


class Query(graphene.ObjectType):
    all_todo = graphene.List(ToDoType)
    all_users = graphene.List(CustomUserType)
    all_projects = graphene.List(ProjectType)
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    user_by_id = graphene.Field(CustomUserType, id=graphene.Int(required=True))

    def resolve_project_by_id(root, info, id):
        try:
            return Project.objects.get(pk=id)
        except Project.DoesNotExist:
            return None

    def resolve_user_by_id(root, info, id):
        try:
            return CustomUser.objects.get(pk=id)
        except CustomUser.DoesNotExist:
            return None

    def resolve_all_todo(root, info):
        return ToDo.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()


schema = graphene.Schema(query=Query, mutation=Mutation)

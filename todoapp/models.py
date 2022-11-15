from django.db import models

from authapp import models as authapp_models


class ProjectManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(deleted=False)


class Project(models.Model):
    objects = ProjectManager()
    project_name = models.CharField(max_length=256)
    link = models.CharField(max_length=256, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    project_team = models.ManyToManyField(authapp_models.CustomUser)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    updated = models.DateTimeField(auto_now=True, editable=False)
    deleted = models.BooleanField(default=False)

    def __str__(self):
        team = list(self.project_team.values_list("username", flat=True))
        return f"{self.project_name} {team}"


class ToDoManger(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(deleted=False, project__in=Project.objects.all())


class ToDo(models.Model):
    objects = ToDoManger()
    project = models.ForeignKey(Project, related_query_name="project", related_name="project", on_delete=models.CASCADE)
    user = models.ForeignKey(authapp_models.CustomUser, on_delete=models.CASCADE)
    body = models.TextField(blank=False)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    updated = models.DateTimeField(auto_now=True, editable=False)
    is_active = models.BooleanField(default=True)
    deleted = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not (self.user in self.project.project_team.all()):
            return
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user} on {self.project} at {self.created}"

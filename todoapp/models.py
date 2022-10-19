from django.db import models

from authapp import models as authapp_models


class Project(models.Model):
    project_name = models.CharField(max_length=256)
    link = models.CharField(max_length=256, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    project_team = models.ManyToManyField(authapp_models.CustomUser)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    updated = models.DateTimeField(auto_now=True, editable=False)
    deleted = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.project_name}"


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(authapp_models.CustomUser, on_delete=models.CASCADE)
    body = models.TextField(blank=False)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    updated = models.DateTimeField(auto_now=True, editable=False)
    is_active = models.BooleanField(default=True)
    deleted = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user} on {self.project} at {self.created}"

from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIClient, APIRequestFactory, APITestCase, force_authenticate

from authapp.models import CustomUser
from todoapp.models import Project, ToDo
from todoapp.views import ProjectModelViewSet


class TestProjectsViewSet(TestCase):
    def setUp(self):
        super().setUp()
        self.factory = APIRequestFactory()
        self.admin = CustomUser.objects.create_superuser("admin", "admin@admin.com", "admin")

    def test_get_list(self):
        request = self.factory.get("/api/projects/")
        view = ProjectModelViewSet.as_view({"get": "list"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_auth(self):
        user = mixer.blend(CustomUser)
        request = self.factory.post(
            "/api/projects/",
            {
                "project_name": "ToDo",
                "link": "http://todo.com",
                "description": "Tasklist application",
                "project_team": [user.id],
            },
            format="json",
        )
        force_authenticate(request, self.admin)
        view = ProjectModelViewSet.as_view({"post": "create"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_edit_task_admin(self):
        project = mixer.blend(Project, project_team=[self.admin])
        todo = mixer.blend(ToDo, project=project, user=self.admin)
        client = APIClient()
        client.login(username="admin", password="admin")
        response = client.put(
            f"/api/todo/{todo.id}/",
            {"project": f"{project.id}", "user": self.admin.id, "body": "The same body"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        task = ToDo.objects.get(pk=todo.id)
        self.assertEqual(task.body, "The same body")
        client.logout()


class TestToDoViewSet(APITestCase):
    fixtures = (
        "TODO/authapp/fixtures/users_data.json",
        "TODO/authapp/fixtures/group_data.json",
        "TODO/todoapp/fixtures/projects_data.json",
        "TODO/todoapp/fixtures/todo_data.json",
    )

    def test_get_list(self):
        response = self.client.get("/api/todo/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_auth(self):
        self.client.login(username="admin", password="admin")
        response = self.client.get("/api/todo/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_created_count_admin(self):
        new_project = mixer.blend(Project)
        projects_count = Project.objects.count()
        self.client.login(username="admin", password="admin")
        response = self.client.post(
            "/api/projects/",
            {
                "project_name": f"{new_project.project_name}_v2.0",
                "project_team": [user.id for user in CustomUser.objects.all()],
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertGreater(Project.objects.count(), projects_count)


class TestJWTToken(APITestCase):
    def test_api_jwt(self):
        user = CustomUser.objects.create_user(username="test", email="test@test.com", password="test", is_active=True)

        response = self.client.post("/api-jwt/", {"username": "test", "password": "test"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue("access" in response.data)

        token = response.data["access"]
        response = self.client.post("/api-jwt/verify/", {"token": token}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        put_data = {"username": "test", "email": "test@test.uk", "password": "test"}
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + token)
        put_response = self.client.put(f"/api/users/{user.id}/", put_data, format="json")
        self.assertEqual(put_response.status_code, status.HTTP_200_OK)

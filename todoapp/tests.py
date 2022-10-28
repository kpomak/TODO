from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIRequestFactory, APITestCase, force_authenticate

from authapp.models import CustomUser
from todoapp.views import ProjectModelViewSet

# 2. Написать минимум один тест для API, используя APIClient.
# 3. Написать минимум один тест для API, используя APITestCase.


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

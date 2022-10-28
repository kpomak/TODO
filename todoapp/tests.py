from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIClient, APIRequestFactory, APITestCase, force_authenticate

from authapp.models import CustomUser
from todoapp.models import Project, ToDo
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

    def test_edit_task_admin(self):
        project = mixer.blend(Project, project_team=[self.admin])
        todo = ToDo.objects.create(project=project, user=self.admin, body="Other body")
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


#     def test_edit_admin(self):
#         author = Author.objects.create(name='Пушкин', birthday_year=1799)
#         book = Book.objects.create(name='Пиковая дама', author=author)
#         admin = User.objects.create_superuser('admin', 'admin@admin.com',
# 'admin123456')
#         self.client.login(username='admin', password='admin123456')
#         response = self.client.put(f'/api/books/{book.id}/', {'name': 'Руслан и
# Людмила', 'author': book.author.id})
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
# book = Book.objects.get(id=book.id)
#         self.assertEqual(book.name,'Руслан и Людмила')

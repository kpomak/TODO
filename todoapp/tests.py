# import json
from unittest import TestCase

from authapp.models import CustomUser
# from mixer.backend.django import mixer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APIClient, APIRequestFactory, APISimpleTestCase, APITestCase, force_authenticate

from todoapp.views import ProjectModelViewSet

# 1. Написать минимум один тест для API, используя APIRequestFactory.
# 2. Написать минимум один тест для API, используя APIClient.
# 3. Написать минимум один тест для API, используя APITestCase.

class TestProjectsViewSet(TestCase):

    def setUp(self):
        factory = APIRequestFactory()
        self.request = factory.get('/api/projects/')
        return super().setUp()


    def test_get_list(self):

        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(self.request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_get_admin(self):
        admin = CustomUser.objects.create_superuser('administrator', 'admin@aaa.com', 'admin')
        force_authenticate(self.request, admin)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(self.request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)






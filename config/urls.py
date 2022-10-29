from django.contrib import admin
from django.urls import include, path, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from graphene_django.views import GraphQLView
from rest_framework import permissions
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from authapp.views import CustomUserModelViewSet
from todoapp.views import ProjectModelViewSet, ToDoModelViewSet

router = DefaultRouter()
router.register("users", CustomUserModelViewSet)
router.register("projects", ProjectModelViewSet)
router.register("todo", ToDoModelViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="ToDo task list",
        default_version="ver_1.0",
        description="Documentation to ToDo-API",
        contact=openapi.Contact(email="roman_ryzkov@internet.ru"),
        license=openapi.License(name="MIT"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path("admin/", admin.site.urls, name="admin"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include(router.urls), name="api"),
    path("api-token-auth/", views.obtain_auth_token, name="toke_auth"),
    path("api-jwt/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api-jwt/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api-jwt/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("graphql/", GraphQLView.as_view(graphiql=True), name="graphql"),
    re_path(r"^swagger(?P<format>\.json|\.yaml)$", schema_view.without_ui(cache_timeout=0), name="schema-json"),
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]

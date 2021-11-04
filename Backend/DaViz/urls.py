from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
# Swagger
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from rest_framework import permissions

# swagger pattern
schema_url_patterns = [
    path('datasets/', include('datasets.urls')),
    path('boards/', include('boards.urls')),
]

# swagger 정보 설정
schema_view_v1 = get_schema_view(
    openapi.Info(
        title="DaViz's API", # 타이틀
        default_version='v1', # 버전
        description="Data Visualization", # 설명
        terms_of_service="https://www.google.com/policies/terms/",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
    patterns=schema_url_patterns,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('datasets/', include('datasets.urls')),
    path('boards/', include('boards.urls')),
    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view_v1.without_ui(cache_timeout=0), name='schema-json'), 
    url(r'^swagger/$', schema_view_v1.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'), 
    url(r'^redoc/$', schema_view_v1.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

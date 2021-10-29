from django.urls import path
from . import views


urlpatterns = [
    path('upload/', views.upload),
    path('download/<str:data_title>/', views.download),

]

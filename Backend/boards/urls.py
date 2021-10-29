from django.urls import path
from . import views

urlpatterns = [
    path('/', views.datalist),
    path('search/', views.search),
]

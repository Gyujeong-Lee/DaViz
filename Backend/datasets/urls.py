from django.urls import path
from . import views


urlpatterns = [
    # path('check/', views.check),
    path('upload/', views.upload),
    path('download/<str:data_title>/', views.download),
    path('overall/', views.overall),
    path('detail/<str:columns>', views.detail),

]

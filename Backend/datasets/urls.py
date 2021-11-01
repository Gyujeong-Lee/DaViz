from django.urls import path
from . import views


urlpatterns = [
    # path('check/', views.check),
    path('upload/', views.upload),
    path('download/<str:data_title>/', views.download),
    path('<int:dataset_id>/overall/', views.overall),
    path('<int:dataset_id>/detail/', views.detail),
    path('<int:dataset_id>/filter/<str:condition>', views.filter),

]

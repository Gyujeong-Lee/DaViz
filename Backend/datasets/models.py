from django.db import models
from django.db.models.base import Model

# Create your models here.
class Info_Dataset(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField()
    columns = models.CharField(max_length=500, blank=True)

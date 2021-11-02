from django.db import models
from django.db.models.base import Model


class Info_Dataset(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField()
    columns = models.CharField(max_length=500, blank=True)
    # row_cnt = models.IntegerField(blank=True)


class Basic_Result(models.Model):
    dataset = models.OneToOneField(Info_Dataset, on_delete=models.CASCADE)
    col_name = models.CharField(max_length=100)
    min_val = models.FloatField()
    max_val = models.FloatField()
    dtype = models.CharField(max_length=50)
    unique_cnt = models.IntegerField()
    x_axis = models.TextField()
    y_axis = models.TextField()
    null_cnt = models.IntegerField()
    p_value = models.FloatField()
    skewness = models.FloatField()
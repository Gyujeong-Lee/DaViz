from django.db import models
from django.db.models.base import Model


class Info_Dataset(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField()
    columns = models.TextField()
    row_cnt = models.IntegerField(blank=True)


class Basic_Result(models.Model):
    dataset = models.ForeignKey(Info_Dataset, on_delete=models.CASCADE)
    col_name = models.CharField(max_length=100)
    mean = models.FloatField(blank=True, null=True)
    std = models.FloatField(blank=True, null=True)
    min_val = models.FloatField(blank=True, null=True)
    max_val = models.FloatField(blank=True, null=True)
    mode = models.FloatField(blank=True, null=True)
    dtype = models.CharField(max_length=50)
    unique_cnt = models.IntegerField()
    x_axis = models.TextField(blank=True, null=True)
    y_axis = models.TextField(blank=True, null=True)
    null_cnt = models.IntegerField()
    p_value = models.FloatField(blank=True, null=True)
    skewness = models.FloatField(blank=True, null=True)
    q1 = models.FloatField(blank=True, null=True)
    q2 = models.FloatField(blank=True, null=True)
    q3 = models.FloatField(blank=True, null=True)
    box_min = models.FloatField(blank=True, null=True)
    box_max = models.FloatField(blank=True, null=True)
from django.core.checks.messages import Info
from django.db.models import fields
from rest_framework import serializers
from .models import *

class DataInfoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Info_Dataset
        fields = ('__all__')

class DataInfoListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Info_Dataset
        fields = ('id', 'title', 'description', 'created_at', 'file', 'columns',)

# basic result
class BasicResultSerializer(serializers.ModelSerializer):

    class Meta:
        model = Basic_Result
        exclude = ('dataset',)
from rest_framework import serializers
from .models import *

class DataInfoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Info_Dataset
        fields = ('__all__')

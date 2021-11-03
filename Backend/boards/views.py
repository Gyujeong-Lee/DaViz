from django.shortcuts import get_list_or_404, render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.serializers import Serializer
from datasets import serializers

from datasets.models import Info_Dataset
from datasets.serializers import DataInfoListSerializer

# Create your views here.

@api_view(['GET'])
def datalist(request):
    datasets = get_list_or_404(Info_Dataset.objects.order_by('-created_at'))
    serializers = DataInfoListSerializer(datasets, many=True)

    return Response(serializers.data)

@api_view(['GET'])
def search(request):
    pass

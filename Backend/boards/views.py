from django.core.checks import messages
from django.shortcuts import get_list_or_404, get_object_or_404, render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.serializers import Serializer
from datasets import serializers
from django.db.models import Q

from datasets.models import Info_Dataset
from datasets.serializers import DataInfoListSerializer

# Create your views here.

@api_view(['GET'])
def datalist(request):
    datasets = get_list_or_404(Info_Dataset.objects.order_by('-created_at'))
    serializers = DataInfoListSerializer(datasets, many=True)

    return Response(serializers.data)

def search_db(keyword):
    query_set = Info_Dataset.objects.filter(Q(title__icontains= keyword) | Q(description__icontains=keyword) | Q(file__icontains=keyword))

    return query_set

@api_view(['GET'])
def search(request, content):
    search_list = content.split(' ')
    query_set = list(map(search_db, search_list))
    datasets = get_list_or_404(query_set[0])
    serializers = DataInfoListSerializer(datasets, many=True)
    
    return Response(serializers.data, status=status.HTTP_200_OK)

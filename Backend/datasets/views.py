from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

#url + db에 저장된 file = 저장 경로
from DaViz.settings import AWS_S3_CUSTOM_DOMAIN as url


from .serializers import *

# Create your views here.

@api_view(['POST'])
def upload(request, format=None):
    serializers = DataInfoSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
        # print(serializers.dataset)
        return Response(serializers.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def download(request, data_title):
    data = {
        'url': '{}/{}'.format(url, data_title)
    }
    return Response(data)
from os import name, path, sep
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

#url + db에 저장된 file = 저장 경로
from DaViz.settings import AWS_S3_CUSTOM_DOMAIN as url
from .serializers import *

import pandas as pd
import io
from sqlalchemy import create_engine
import pymysql




# Create your views here.

#데이터 셋 업로드, 원본 데이터 S3 저장 후 데이터 분석 결과 DB 저장
@api_view(['POST'])
def upload(request, format=None):
    csv_file = request.FILES['file']
    print(type(csv_file))
    print(csv_file.size)

    # print(csv_file)
    serializers = DataInfoSerializer(data=request.data)

    df = pd.read_csv(io.StringIO(csv_file.read().decode('cp949')))
    print(1)

    #dataframe DB에 저장
    db_connection_str = 'mysql+pymysql://admin:1q2w3e4r5t!@bee.cjkrtt0iwcwz.ap-northeast-2.rds.amazonaws.com/DaViz'
    db_connection = create_engine(db_connection_str)
    df.to_sql(name='{}'.format(csv_file.name), con=db_connection, if_exists='replace', index=True)

    #유효성 검사
    if serializers.is_valid():
        #S3 저장
        serializers.save()
        #기초 통계 내용 분석 후 저장 

        return Response(serializers.data, status=status.HTTP_201_CREATED)

#S3에서 원본 데이터 다운받기
@api_view(['GET'])
def download(request, data_title):
    data = {
        'url': '{}/{}'.format(url, data_title)
    }
    return Response(data)


#DB에 저장된 기초 통계 내용 불러오기
@api_view(['GET'])
def overall(request, dataset_id):
    pass

#기본 디테일
@api_view(['GET'])
def detail(request, dataset_id):
    pass


##컬럼내용 url로 입력받음, 해당 컬럼 분기 처리하여 재분석
@api_view(['GET'])
def filter(request, dataset_id, condition):
    pass
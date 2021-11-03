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
import time

# Create your views here.

#데이터 셋 업로드, 원본 데이터 S3 저장 후 데이터 분석 결과 DB 저장
@api_view(['POST'])
def upload(request, format=None):
    csv_file = request.FILES['file']
    file_name = csv_file.name

    # print(csv_file)
    serializers = DataInfoSerializer(data=request.data)
    s = time.time()

    if file_name.endswith('.csv'):
        df = pd.read_csv(io.StringIO(csv_file.read().decode('cp949')), thousands=',')
        row_cnt = df.shape[0]
        cols = df.columns.values
        columns = ''
        for c in cols:
            columns = columns + c + '|'
    else:
        #다른 확장자의 경우... 고민 해볼 것
        print('잘못된 형식입니다.')

    print(time.time() -s)

    #dataframe(원본 데이터)을 DB에 저장
    db_connection_str = 'mysql+pymysql://admin:1q2w3e4r5t!@bee.cjkrtt0iwcwz.ap-northeast-2.rds.amazonaws.com/DaViz'
    db_connection = create_engine(db_connection_str)
    df.to_sql(name='{}'.format(file_name), con=db_connection, if_exists='replace', index=True)
    print(time.time() -s)

    #유효성 검사
    if serializers.is_valid():
        #원본 데이터 S3 저장
        title = serializers.data['title']
        
        serializers.save(row_cnt=row_cnt, columns=columns)
        #기초 통계 내용 분석 후 DB 저장

        return Response(serializers.data, status=status.HTTP_201_CREATED)

#S3에서 원본 데이터 다운받기 -> url 보내줌
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

#기본 디테일, 이상치 제거 이전
@api_view(['GET'])
def detail(request, dataset_id):
    pass


##컬럼내용 url로 입력받음, 해당 컬럼 분기 처리하여 재분석
@api_view(['GET'])
def filter(request, dataset_id, condition):
    pass
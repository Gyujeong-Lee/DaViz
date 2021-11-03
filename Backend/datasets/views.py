from os import name, path, sep
from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import get_list_or_404, get_object_or_404, render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

#url + db에 저장된 file = 저장 경로
from DaViz.settings import AWS_S3_CUSTOM_DOMAIN as url
from .serializers import *
from .models import *

import pandas as pd
import io
from sqlalchemy import create_engine
import pymysql
import time
import datetime

from scipy.stats import shapiro
import matplotlib.pyplot as plt

# Create your views here.

#데이터 셋 업로드, 원본 데이터 S3 저장 후 데이터 분석 결과 DB 저장
@api_view(['POST'])
def upload(request, format=None):
    csv_file = request.FILES['file']
    file_name = csv_file.name

    # 시간 측정과 네이밍을 위해
    s = time.time()
    td = datetime.date.today()
    td_by_day = td.strftime('%Y%m%d')

    #csv 확장자
    if file_name.endswith('.csv'):
        #file -> df
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
    df.to_sql(name='{}|{}'.format(file_name, td_by_day), con=db_connection, if_exists='replace', index=True)
    print(time.time() -s)

    serializers = DataInfoSerializer(data=request.data)
    #유효성 검사
    if serializers.is_valid():
        #원본 데이터 S3 저장
        serializers.save(file = file_name + '|{}'.format(td_by_day), row_cnt=row_cnt, columns=columns)

        #기초 통계 내용 분석 후 DB 저장
        info = get_object_or_404(Info_Dataset, file=file_name + '|{}'.format(td_by_day))
        dataset_id = info.id
        stat_df = pd.DataFrame(columns=['col_name', 'mean', 'std', 'min_val', 'max_val', 'mode', 'dtype', 'unique_cnt', 'x_axis', 'y_axis', 'null_cnt', 'p_value', 'skewness', 'q1', 'q2', 'q3', 'dataset_id'])

        cols = df.columns
        for col in cols:
            now_col = df[col]
            stat_df.loc[col] = pd.Series()
            # col_name 저장
            stat_df.loc[col, 'col_name'] = col
            # dtype 저장
            stat_df.loc[col, 'dtype'] = now_col.dtype
            # null_cnt 저장
            stat_df.loc[col, 'null_cnt'] = now_col.isna().sum()
            # unique_cnt 저장
            unique = now_col.value_counts()
            stat_df.loc[col, 'unique_cnt'] = len(unique)

            # 데이터 타입이 object인 경우 (string)
            if stat_df.loc[col, 'dtype'] == 'object':
                # 도넛 차트 데이터 저장
                stat_df.loc[col, 'x_axis'] = '|'.join(unique.index[:5])
                stat_df.loc[col, 'y_axis'] = '|'.join(list(map(str, unique.values[:5])))
                
            # 데이터 타입이 수치형인 경우 (int, float)
            else:
                stat_df.loc[col, ['mean', 'std', 'min_val', 'q1', 'q2', 'q3', 'max_val']] = df[col].describe().values[1:]

                # 히스토그램 데이터 저장
                unique_cnt = len(unique)
                if unique_cnt >= 500:
                    bin_cnt = 50
                elif unique_cnt >= 100:
                    bin_cnt = max(30, unique_cnt//100)
                elif unique_cnt >= 5:
                    bin_cnt = max(5, unique_cnt//5)
                else:
                    bin_cnt = unique_cnt
                # print('bins 값', bin_cnt)

                if bin_cnt:
                    histo = plt.hist(now_col, bins=bin_cnt)
                    stat_df.loc[col, 'x_axis'] = '|'.join(list(map(str, map(int, histo[0]))))
                    stat_df.loc[col, 'y_axis'] = '|'.join(list(map(str, histo[1].round(1))))
                
                # mode(최빈값) 저장
                if not unique.empty:
                    stat_df.loc[col, 'mode'] = unique.values[0]
                # 정규성검정 p-value & skewness 저장
                if len(now_col.dropna()) >= 3:
                    stat, p  = shapiro(now_col.dropna().values)
                    stat_df.loc[col, 'p_value'] = p
                stat_df.loc[col, 'skewness'] = now_col.skew()

        # dataset_id 저장
        stat_df['dataset_id'] = dataset_id

        # DB에 저장 (table append)
        stat_df.to_sql(name='datasets_basic_result', con=db_connection, if_exists='append', index=False)

        return Response(serializers.data, status=status.HTTP_201_CREATED)



#S3에서 원본 데이터 다운받기 -> url 보내줌 // front에서 바로 처리할 수 있을 수도.........................
@api_view(['GET'])
def download(request, dataset_name):
    #|로 분리해서 받을 것
    data = {
        'url': '{}/{}'.format(url, dataset_name)
    }
    return Response(data)


#DB에 저장된 기초 통계 내용 불러오기
@api_view(['GET'])
def overall(request, dataset_id):
    dataset_info = get_object_or_404(Info_Dataset, id=dataset_id)
    basic_result = get_list_or_404(Basic_Result.objects.filter(id=dataset_id))
    # result_serializers = BasicResultSerializer(basic_result, many=True)
    info_serializers = DataInfoSerializer(dataset_info)
    overall = {
        'result': serializers.data,
        'info': info_serializers.data
    }
    return JsonResponse(overall, status=status.HTTP_200_OK)

#기본 디테일, 이상치 제거 이전
@api_view(['GET'])
def detail(request, dataset_id):
    #해당 dataset의 basic result 가져오기 5개 
    basic_result = get_list_or_404(Basic_Result.objects.filter(id=dataset_id)[:5])
    #serializing
    # serializers = BasicResultSerializer(basic_result, many=True)

    return Response(serializers.data, status=status.HTTP_200_OK)


##컬럼내용 url로 입력받음, 해당 컬럼 분기 처리하여 재분석
@api_view(['GET'])
def filter(request, dataset_id, condition):
    #column 뽑아내기
    #val = 1 -> filter o // val = 0 -> filter x 
    conditions = condition.split('&')

    #read_sql에 인자로 보내주기 위해
    columns = []

    #column 별 필터 체크
    conditions_dict = {}
    for f in conditions:
        temp = f.split('=')
        conditions_dict[temp[0]] = int(temp[1])
        columns.append(temp[0])

    #DB에서 테이블 가져오기
    dataset_info = get_object_or_404(Info_Dataset, id=dataset_id)
    table_name = dataset_info.file
    db_connection_str = 'mysql+pymysql://admin:1q2w3e4r5t!@bee.cjkrtt0iwcwz.ap-northeast-2.rds.amazonaws.com/DaViz'
    db_connection = create_engine(db_connection_str)
    
    #위에서 정의한 컬럼만 읽어온다.
    df = pd.read_sql(table_name, con=db_connection, columns=columns)
    print(df)
    data = {
        'message' : 'good'
    }

    return Response(data, status=status.HTTP_200_OK)
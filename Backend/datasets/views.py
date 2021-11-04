from os import name, path, sep
from django.core.checks import messages
from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import get_list_or_404, get_object_or_404, render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

#url + db에 저장된 file = 저장 경로
from DaViz.settings import AWS_S3_CUSTOM_DOMAIN as url
from .serializers import *
from .models import *

import numpy as np
import pandas as pd
import io
from sqlalchemy import create_engine
import pymysql
import time
import datetime
import chardet

from scipy.stats import shapiro
import matplotlib.pyplot as plt



def graph_axis(now_col):
    unique = now_col.value_counts()
    unique_cnt = len(unique)

    # 데이터 타입이 object인 경우 (string)
    if now_col.dtype == 'object':
        # 도넛 차트 데이터 저장
        if unique_cnt > 5:
            x_axis = '|'.join(unique.index[:5])
            y_axis = '|'.join(list(map(str, unique.values[:5])))
        else:
            x_axis = '|'.join(unique.index)
            y_axis = '|'.join(list(map(str, unique.values)))
        
    # 데이터 타입이 수치형인 경우 (int, float)
    else:
        # 히스토그램 데이터 저장
        if unique_cnt >= 500:
            bin_cnt = 50
        elif unique_cnt >= 100:
            bin_cnt = max(30, unique_cnt//100)
        elif unique_cnt >= 5:
            bin_cnt = max(5, unique_cnt//5)
        else:
            bin_cnt = unique_cnt

        if bin_cnt:
            histo = plt.hist(now_col, bins=bin_cnt)
            x_axis = '|'.join(list(map(str, map(int, histo[0]))))
            y_axis = '|'.join(list(map(str, histo[1].round(1))))
        else:
            x_axis, y_axis = '', ''

    return x_axis, y_axis



#데이터 셋 업로드, 원본 데이터 S3 저장 후 데이터 분석 결과 DB 저장
@api_view(['POST'])
def upload(request, format=None):
    csv_file = request.FILES['file']
    file_name = csv_file.name

    # 시간 측정과 네이밍을 위해
    s = time.time()
    td = datetime.date.today()
    td_by_day = td.strftime('%Y%m%d')


    #같은 데이터셋의 중복
    if Info_Dataset.objects.filter(file= file_name + '|{}'.format(td_by_day)).exists():
        
        return Response({'messages': '같은 이름의 파일(데이터 셋)이 존재합니다. 해당 분석 결과를 참조해주세요'}, status=status.HTTP_409_CONFLICT)

    #csv 확장자
    if file_name.endswith('.csv'):
        #file -> df
        try:
            df = pd.read_csv(io.StringIO(csv_file.read().decode('utf-8')), thousands=',')
            row_cnt = df.shape[0]
            cols = df.columns.values
            columns = ''
            for c in cols:
                columns = columns + c + '|'
        except:
            return Response({'messages': 'encoding type은 utf-8만 지원합니다.'}, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)
    else:
        #다른 확장자의 경우... 고민 해볼 것
        print('잘못된 형식입니다.')
        return Response({'messages': 'csv 파일 형식만 지원합니다.'}, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)

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

        s = time.time()
        #기초 통계 내용 분석 후 DB 저장
        info = get_object_or_404(Info_Dataset, file=file_name + '|{}'.format(td_by_day))
        dataset_id = info.id
        stat_df = pd.DataFrame(columns=['col_name', 'mean', 'std', 'min_val', 'max_val', 'mode', 'dtype', 'unique_cnt', 'x_axis', 'y_axis', 'null_cnt', 'p_value', 'skewness', 'q1', 'q2', 'q3', 'box_min', 'box_max', 'dataset_id'])

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
            # x_axis, y_axis 저장
            stat_df.loc[col, ['x_axis', 'y_axis']] = graph_axis(now_col)
                
            # 데이터 타입이 수치형인 경우 (int, float)
            if now_col.dtype != 'object':
                stat_df.loc[col, ['mean', 'std', 'min_val', 'q1', 'q2', 'q3', 'max_val']] = df[col].describe().values[1:]
                
                # mode(최빈값) 저장
                if not unique.empty:
                    stat_df.loc[col, 'mode'] = unique.values[0]
                # 정규성검정 p-value & skewness 저장
                if len(now_col.dropna()) >= 3:
                    stat_df.loc[col, 'p_value'] = shapiro(now_col.dropna().values).pvalue
                stat_df.loc[col, 'skewness'] = now_col.skew()

                # box_min, box_max 저장
                q1 = stat_df.loc[col, 'q1']
                q3 = stat_df.loc[col, 'q3']
                iqr = q3 - q1
                lc = q1 - 1.5*iqr
                uc = q3 + 1.5*iqr
                box = now_col[(now_col>=lc)&(now_col<=uc)]
                stat_df.loc[col, ['box_min', 'box_max']] = box.min(), box.max()

        # dataset_id 저장
        stat_df['dataset_id'] = dataset_id

        # DB에 저장 (table append)
        stat_df.to_sql(name='datasets_basic_result', con=db_connection, if_exists='append', index=False)
        print(time.time() -s)
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
    basic_result = get_list_or_404(Basic_Result.objects.filter(dataset=dataset_info))
    # result_serializers = BasicResultSerializer(basic_result, many=True)
    info_serializers = DataInfoSerializer(dataset_info)
    result_serializers = BasicResultSerializer(basic_result, many=True)
    overall = {
        'info': info_serializers.data,
        'result': result_serializers.data,
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

    #column 별 필터 체크
    conditions_dict = {}
    for f in conditions:
        temp = f.split('=')
        conditions_dict[temp[0]] = temp[1]

    #DB에서 테이블 가져오기
    dataset_info = get_object_or_404(Info_Dataset, id=dataset_id)
    table_name = dataset_info.file
    db_connection_str = 'mysql+pymysql://admin:1q2w3e4r5t!@bee.cjkrtt0iwcwz.ap-northeast-2.rds.amazonaws.com/DaViz'
    db_connection = create_engine(db_connection_str)
    
    #위에서 정의한 컬럼만 읽어온다.
    df = pd.read_sql(table_name, con=db_connection)
    df_cols = list(df.columns)
    columns = sorted(conditions_dict.keys(), key=lambda x:df_cols.index(x))

    for col in columns:
        now_col = df[col]
        now_filter = conditions_dict[col]
        # 첫 번째 자리가 1이면 --> null 제거
        if now_filter[0] == '1':
            df = df[now_col.notna()]
        # 두 번째 자리가 1이면 --> 이상치 제거 (수치형 데이터만 해당)
        if now_filter[1] == '1':
            col_basic = get_object_or_404(Basic_Result, dataset=dataset_info, col_name=col)

            # normal distribution이라 가정 -- > modified Z-score 사용
            if col_basic.p_value and col_basic.p_value > 0.05:
                # 1. 해당 컬럼의 중앙값(median) 계산
                median = np.median(now_col)
                # 2. MAD 계산 (Median Absolute Deviation)
                mad = np.median(abs(now_col - median))
                # 3. Modified Z-score 구하기 
                modified_z_score = 0.6745 * (now_col - median) / mad
                df = df[(modified_z_score>=-3.5)&(modified_z_score<=3.5)]
            # normal distribution이라는 가정 기각
            else:
                q1 = now_col.quantile(p=0.25)
                q2 = now_col.quantile(p=0.5)
                q3 = now_col.quantile(p=0.75)
                # skewness가 높음 --> SIQR 사용
                if abs(col_basic.skewness) > 2:
                    l_siqr = q2 - q1
                    u_siqr = q3 - q2
                    lc = q1 - 3*l_siqr
                    uc = q3 + 3*u_siqr
                    df = df[(now_col>=lc)&(now_col<=uc)]
                # skewness가 높지 않음 --> IQR 사용
                else:
                    iqr = q3 - q1
                    lc = q1 - 1.5*iqr
                    uc = q3 + 1.5*iqr
                    df = df[(now_col>=lc)&(now_col<=uc)]

    results = []
    for col in columns:
        now_col = df[col]
        unique = now_col.value_counts()
        x_axis, y_axis = graph_axis(now_col)
        
        if df[col].dtype == 'object':
            result = {
                'col_name' : col,
                'dtype' : df[col].dtype,
                'unique_cnt' : len(unique),
                'x_axis' : x_axis,
                'y_axis' : y_axis,
                'null_cnt' : df[col].isna().sum(),
            }
        else:
            col_describe = df[col].describe()
            q1 = col_describe['25%']
            q3 = col_describe['75%']
            iqr = q3 - q1
            lc = q1 - 1.5*iqr
            uc = q3 + 1.5*iqr
            box = now_col[(now_col>=lc)&(now_col<=uc)]

            result = {
                'col_name' : col,
                'mean' : col_describe['mean'],
                'std' : now_col.std(),
                'min_val' : col_describe['min'],
                'max_val' : col_describe['max'],
                'mode' : unique.values[0],
                'dtype' : df[col].dtype,
                'unique_cnt' : len(unique),
                'x_axis' : x_axis,
                'y_axis' : y_axis,
                'null_cnt' : df[col].isna().sum(),
                'p_value' : shapiro(now_col.dropna().values).pvalue,
                'skewness' : now_col.skew(),
                'q1' : q1,
                'q2' : col_describe['50%'],
                'q3' : q3,
                'box_min' : box.min(),
                'box_max' : box.max(),
            }
        results.append(result)

    data = {
        'data' : results,
    }

    return JsonResponse(data, status=status.HTTP_200_OK)

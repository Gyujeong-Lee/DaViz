# DaViz (데이비즈):cookie:

> Data + Visualization
>
> 개발 기간 : 10.13 ~ 11.19 (6주)
>
> 배포 주소 :  https://daviz.shop/



## 목차📚

- [기획 의도](#기획-의도)
- [서비스 소개](#서비스-소개)

- [개발 스택](#개발-스택)
- [서비스 구조](#서비스-구조)
- [Getting Started](#getting-started)
- [팀원 소개](#팀원-소개)

## 기획 의도

- 빅데이터와 AI의 발전에 따라 이를 위한 데이터 활용역량 향상이 요구되고 있고, 관련 업무들도 다양해짐.

- 데이터분석이나 ML(Machine Learning)/DL(Deep Learning) 모델링시 첫번째 작업은 데이터셋의 특성을 파악하는 것이고,

  데이터셋의 특성을 쉽게 파악할 수 있다면 데이터 분석과 활용의 로드맵을 세우는 작업이 용이해질 것임.

  - 데이터셋 특성 파악 : outlier detection, 데이터 feature 추출, 데이터 시각화 등을 활용

- 데이터셋의 대략적 특성을 파악할 수 있는 시각화와 통계측정치를 제공하는 웹페이지 개발을 통해 이를 도울 수 있을 것.



##### 문제점

- 전행적으로 통일된 outlier detection 방법이 없음.
  - 이로 인해 데이터 분석가의 역량에 따라 데이터 분석 결과가 매우 달라짐.
- 한눈에 확인할 수 없어 jupyter notebook 등을 이용해 일일이 확인해가며 작업하는 번거로움이 있음.



##### 해결안

- 정형화된 outlier detection 방법을 사용해 outlier 제거 전/후의 데이터 feature를 제공함으로써 비교 분석이 용이하게 함.
  - 데이터 분석 및 ML/DL 모델링 시 참고 용도로 활용





## 서비스 소개

> 빅데이터 분석을 위한 데이터셋 feature 시각화 프로그램
>
> - [프로토타입](./설계/prototype.pdf)
> - [기능명세서](./설계/기능명세서.pdf)
> - [Notion](https://www.notion.so/PJT-Daviz-00f38c7cd62d4dfcad1e45f04bc2ad7b)

#### 주요기능

- 데이터 feature 추출
  - 데이터 유형(수치형/범주형)에 따라 적절한 데이터 feature 추출
    - count, mean, max, min, std, quantile, mode, unique value 개수 등
- outlier detection
  - 체크 박스를 통해 outlier 제거 전/후의 데이터 feature를 비교 분석
    - 수치형 : outlier, null
    - 범주형 : null
- 데이터 시각화
  - 데이터 유형에 따라 그에 맞는 그래프를 통해 데이터 분포 시각화





## 개발 스택

#### FE

- React, Recoil, react-router, Chart.js, MUI, styled-components

#### BE

- Django REST API, Swagger, MySQL(AWS RDS), Pandas, AWS S3

#### 배포

- AWS EC2, Nginx, gunicorn

#### 협업툴

- JIRA(일정 관리), Gitlab(코드 관리), Notion(내용 정리)
- Discord, Webex (팀미팅)



## 서비스 구조

- 시스템 아키텍쳐

![architecture](README.assets/architecture.png)







## Getting Started

> 프로젝트 환경설정

#### Backend (Django)

```bash
# 가상환경 생성
$ python -m venv venv
# 가상환경 활성화
$ source venv/Scripts/activate
# requirements 설치
$ pip install -r requirements.txt
# migrations
$ python manage.py migrate
# 실행
$ python manage.py runserver
```

#### Frontend (React)

```bash
# 라이브러리 설치
$ npm install
# React 실행
$ npm start
```

#### Server

> 배포문서 참고



## 팀원 소개

> 담당 역할, 기술

#### 이규정 (Leader)

- Backend
- API 문서 작성, Swagger

#### 김윤서

- 데이터 분석
- Frontend

#### 방지환

- Frontend
  - 페이지 구조 설계 및 개발
  - 파일 업로드 기능
  - Chart.js 시각화

#### 정희진

- 데이터 분석
- Backend
- 배포

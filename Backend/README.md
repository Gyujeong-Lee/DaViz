# Setting

### Version

### BE

- Python 3.9.7
- Django 3.2.7

- IDE
  - VScode 1.57.1

- DB
  - MySQL 8.0.26
    - 설치 : [참고 URL](https://velog.io/@joajoa/MySQL-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-%EB%B0%8F-%EC%84%A4%EC%B9%98-%EB%B0%A9%EB%B2%95)

  - AWS - RDS 

    - [참고](https://designdevelop.tistory.com/68)

    - hostname : `hostname.rds.amazonaws.com`
    - user : `admin`
    - pw :  password




### Server 구동

- 가상환경 활성화

  ```
  source venv/Scripts/activate
  ```

  

- 라이브러리 설치

  ```
  # bert 관련 - 처음에만 필요
  pip install mxnet
  pip install git+https://git@github.com/SKTBrain/KoBERT.git@master
  ```

  ```
  pip install -r requirements.txt
  ```



- migration

  ```
  python manage.py migrate
  ```

  

- 실행

  ```
  python manage.py runserver
  ```




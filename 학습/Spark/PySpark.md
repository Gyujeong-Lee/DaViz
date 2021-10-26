# PySpark

> PySpark 기초 문법 정리 vs Pandas
>
> [공식문서](http://spark.apache.org/docs/latest/api/python/)
>
> [PySpark tutorial](https://www.youtube.com/watch?v=_C8kWso4ne4&t=2081s)
>
> [Data Wrangling with PySpark for Data Scientists Who Know Pandas - Andrew Ray](https://www.youtube.com/watch?v=XrpSRCwISdk)



## pyspark.sql

>SparkSession

```python
!pip install findspark
!pip install pyspark
# findspark를 설치 안하면 pyspark module을 찾지 못하는 에러 발생
import findspark
findspark.init()

from pyspark import SparkContext
from pyspark import SparkConf

from pyspark.sql import SparkSession
spark = SparkSession.builder.appName('Dataframe').getOrCreate()
```





## Load CSV

```python
### Pandas
df = pd.read_csv("mtcars.csv")

### PySpark
df = spark.read\
	.options(header=True, inferSchema=True)\
    .csv("mtcars.csv")
    
df_pyspark = spark.read.csv('./sample_dataset.csv', header=True, inferSchema=True)
```



### View DataFrame

```python
### Pandas
df
df.head(10)


### PySpark
df.show()
df.show(10)
```

### Columns and DataFrame

```python
## same
df.columns
df.dtypes
```



### Rename Columns

```python
### Pandas
df.columns = ['a', 'b', 'c']
df.rename(columns = {'old':'new'})

### PySpark
df.toDF('a','b','c')
df.withColumnRenamed('old','new')
```



### Drop Column

```python
### Pandas
df.drop('mpg', axis=1)

### PySpark
df.drop('mpg')
```



### Filtering

```python
### Pandas & PySpark
df[df.mpg<20]
df[(df.mpg<20) & (df.cyl == 6)]

# Example
### loan_amnt가 15000이하인 경우의 grade와 sub_grade
df_pyspark.filter("loan_amnt <= 15000").select(['grade','sub_grade']).show()

### funded_amnt 10000이하, grade=A
### &, |, ~
df_pyspark.filter((df_pyspark['funded_amnt']<= 10000) & (df_pyspark['grade'] == 'A')).show()
```



### Add Column

```python
### Pandas
df['gpm'] = 1 / df.mpg

### PySpark
df.withColumn('gpm', 1 / df.mpg)
```



### Fill nulls

```python
### Pandas
df.fillna(0) # Many more options

### PySpark
df.fillna(0)
```



### Aggregation

```python
### Pandas & PySpark
df.groupby(['cyl','gear'])\
	.agg({'mpg':'mean','disp':'min'})
    
# Example
### Group By
df_pyspark.groupBy('grade').sum().show()
# sum, min, max, mean 등등

### key: value 형식으로 표현
df_pyspark.agg({'funded_amnt':'sum'}).show()
```



### na

```python
### how == all : 전체가 row가 null인 경우 제외
df_pyspark.na.drop(how="all").show()

### any == how : row 요소가 하나라도 null인 경우 제외
df_pyspark.na.drop(how="any").show()

### threshold : null값이 2개 이상인 경우 제외
df_pyspark.na.drop(how="any", thresh=2).show()

### Subset : subset 중에서 null값인 것 제외
df_pyspark.na.drop(how="any", subset=['emp_title']).show()

### Filling the Missing Value
df_pyspark.na.fill('Missing Values', subset=['emp_title', 'grade']).show()
```



### Imputer

```python
from pyspark.ml.feature import Imputer

imputer = Imputer(
    inputCols=['funded_amnt', 'funded_amnt_inv'],
    outputCols = ["{}_imputed".format(c) for c in ['funded_amnt', 'funded_amnt_inv']]
    ).setStrategy("mean")
```

- mean, median





### Standard Transformations

> spark는 JVM 위에서 동작하기 때문에 빠르다

```python
### Pandas
import numpy as np
df['logdisp'] = np.log(df.disp)

### PySpark
import pyspark.sql.functions as F
df.withColumn('logdisp', F.log(df.disp))
```





### Row conditional statements

```python
### Pandas
df['cond'] = df.apply(lambda r: 1 if r.mpg > 20 else 2 if r.cyl==6 else 3, axis=1)

### PySpark
import pyspark.sql.functions as F
df.withColumn('cond',\
              F.when(df.mpg > 20, 1)\
              .when(df.cyl == 6, 2)\
              .otherwise(3))
```



### Python when required

```python
### Pandas
df['disp1'] = df.disp.apply(lambda x:x+1)

### Pyspark
import pyspark.sql.functions as F
from pyspark.sql.types import DoubleType
fn = F.udf(lambda x: x+1,, DoubleType())
df.withColumn('disp1', fn(df.disp))
```



### merge/join dataframes

```python
### Pandas
left.merge(right, on='key')
left.merge(right, left_on='a', right_on='b')

### PySpark
left.join(right, on='key')
left.join(right, left.a == right.b)
```



### Pivot table

```python
### Pandas
pd.pivot_table(df, values = 'D',\
              index=['A', 'B'], columns=['C'],\
              aggfunc=np.sum)

### PySpark
df.groupBy("A", "B").pivot("C").sum("D")
```



### Summary Statistics

```python
### Pandas
df.describe()

### PySpark
df.describe().show() # only count, mean, stddev, min, max

df.selectExpr(
	"percentile_approx(mpg, array(.25, .5, .75)) as mpg"
	).show()
```



### Histogram

```python
### Pandas
df.hist()

### PySpark
df.sample(False, 0.1).toPandas().hist() 
# Pyspark에는 없어서 Pandas로 변환해야함 - 보통 Pyspark는 빅데이터를 다루기 때문에 안쓰는게 좋을듯
```



### SQL

> PySpark에서만 사용 가능

```python
### Pandas
n/a

### PySpark
df.createOrReplaceTempView('foo')
df2 = spark.sql('select * from foo')
```



### Pyspark Best practices

- Use pyspark.sql.functinos and oteher built in functions
- Use the same version of python and packages on cluster as driver
- Check out the UI at http://localhost:4040/

- Learn about SSH port forwarding
- Check out Spark MLlib
- RTFM : https://spark.apache.org/docs/latest/



### Things not to do

- Try to iterate through rows
  - 모든 row를 반복하지 말것
- Hard code a master in your driver
  - Use spark-submit for that
- df.toPandas().head()
  - instead do : df.limit(5).toPandas()
  - pandas로 변환하려면 spark에서 먼저 계산 후 변환



### If things go wrong

- don't panic
- read the error
- google it
- search/ask stack overflow (tag apache-spark)
- search/ask the user list: user@spark.apache.org
- find a bug? make a jira ticket
  - https://issues.apache.org/jira/browse/SPARK/


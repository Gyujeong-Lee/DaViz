# python example 
#spark
import findspark
findspark.init()

from pyspark import SparkContext
from pyspark import SparkConf
from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()

df_example = spark.read.csv('./sample_dataset.csv')
print(df_example)
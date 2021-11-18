import React, { useEffect, useState } from 'react';
import AlbumIcon from '@mui/icons-material/Album';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useHistory } from 'react-router';
import { useAlert } from 'react-alert';
import ScrollHorizontal from 'react-scroll-horizontal';
import axios from 'axios';
import {
  detailDataState,
  detailColumnState,
  selectedColumnState,
  filterConditionState,
  originColumnState,
  detailLoadingState
} from '../recoil/detailAtom';
import DataStatistics from '../components/DataStatistics';
import BoxPlotChart from '../components/charts/BoxPlotChart';
import Histogram from '../components/charts/Histogram';
import DoughnutChart from '../components/charts/DoughnutChart';
import SelectColumn from '../components/SelectColumn';
import LoadingDetail from '../components/LoadingDetail';

const isClicked = [];
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  .top {
    margin-right: 3rem;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 2rem;
  color: #ffffff;
  background-color: #0076be;
  p {
    margin-left: 0.8rem;
    font-size: 1.4rem;
  }
`;

const Between = styled.div`
  display: flex;
  justify-content: space-between;
  align-: center;
  margin-bottom: 0.5rem;
  color: #ffffff;
  background-color: #0076be;
  .home {
    color: #ffffff;
    background-color: transparent;
    font-size: 1.5rem;
    margin-right: 2rem;
    cursor: pointer;
  }
  .back {
    color: #ffffff;
    background-color: transparent;
    font-size: 1.5rem;
    margin-right: 0.3rem;
    cursor: pointer;
  }
  .home:hover {
    opacity: 0.5;
  }
  .back:hover {
    opacity: 0.5;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
`;

const EraseButton = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 7px;
`;

const BoxPlotWrapper = styled.div`
  width: 25%;
  max-width: 30%;
`;
const HistogramWrapper = styled.div`
  width: 25%;
  max-width: 30%;
  width: 20rem;
`;

const DoughnutWrapper = styled.div`
  width: 25%;
  max-width: 30%;
  width: 20rem;
`;

const GraphWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 2.5rem;
  padding-top: 2.5rem;
  border-bottom: 1.5px solid #e0e0e0;
`;

const DSWrapper = styled.div`
  margin-right: 0rem;
`;

const ScrollWrapper = styled.div`
  color: black;
  height: 22em;
  margin-bottom: 3rem;
  margin-top: 1rem;
`;

const NullWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  max-width: 30%;
  width: 20rem;
  font-size: 1.1rem;
  color: red;
`;

// Tooltips
const NullErase = `
Null 값이 포함된 행이 삭제됩니다.
`;
const modifiedZScore = `
p-value 값이 0.5보다 큼 => 'modified z-score' 사용
`;

const IQR = `
정규분포를 따르지 않고 왜도 절대값이 2 이하 => 'IQR' 사용
`;

const SIQR = `
정규분포를 따르지 않고 왜도 절대값이 2 초과 => 'SIQR' 사용
`;

// Overall - Column 전환 버튼
function SelectButton({ id }) {
  const history = useHistory();

  return (
    <Buttons>
      <Stack spacing={2} direction="row">
        <Button
          variant="outlined"
          onClick={() => history.push(`/${id}/detail`)}
        >
          Overall
        </Button>
        <Button variant="contained">Column</Button>
      </Stack>
    </Buttons>
  );
}

function DetailColumn({ match }) {
  const history = useHistory();
  const alert = useAlert();
  const [detailLoading, setDetailLoading] = useRecoilState(detailLoadingState);
  const [detailDatas, setDetailDatas] = useRecoilState(detailDataState);
  const [datasetName, setDatasetName] = useState([]);
  const [filterCondition, setFilterCondition] =
    useRecoilState(filterConditionState);
  const setDetailColumns = useSetRecoilState(detailColumnState);
  const [originalColumnDatas, setOriginColumnDatas] =
    useRecoilState(originColumnState);
  const setSelectedColumns = useSetRecoilState(selectedColumnState);
  const config = { stiffness: detailDatas.length <= 4 ? 0 : 100 };

  const {
    params: { id }
  } = match;

  const goHome = () => {
    history.push('/');
  };

  const goDL = () => {
    history.push('/datalist');
  };

  const getDetailData = () => {
    axios
      .get(`/datasets/${id}/detail`)
      .then((res) => {
        const tempDetail = [];
        for (let i = 0; i < res.data.length; i++) {
          const data = {
            xAxis: res.data[i].x_axis.split('|'),
            yAxis: res.data[i].y_axis.split('|'),
            detailBoxPlot: [
              res.data[i].min_val,
              res.data[i].max_val,
              res.data[i].q1,
              res.data[i].q2,
              res.data[i].q3
            ],
            ...res.data[i]
          };
          tempDetail.push(data);
        }
        setDetailDatas(tempDetail);
        setOriginColumnDatas(tempDetail);
        // 초기 column names 5개 저장
        const temp = [];
        let filterTemp = '';
        for (let i = 0; i < res.data.length; i++) {
          temp.push(res.data[i].col_name);
          if (i === res.data.length - 1) {
            filterTemp += `${res.data[i].col_name}=00`;
          } else {
            filterTemp += `${res.data[i].col_name}=00&`;
          }
        }
        setFilterCondition(filterTemp.split('&'));
        setSelectedColumns(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataSets = async () => {
    await axios
      .get(`/datasets/${id}/overall`)
      .then((res) => {
        const temp = res.data.info.columns.split('|');
        setDetailColumns(temp.splice(0, temp.length - 1));
        const tmp = res.data.info.title;
        setDatasetName(tmp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFilteredDetailData = (condition) => {
    axios
      .get(`/datasets/${id}/filter/${condition.join('&')}`)
      .then((res) => {
        let tmp = res.data.data;
        if (typeof tmp === 'string') {
          tmp = JSON.parse([res.data.data]);
        }
        const tempDetail = [];
        if (tmp !== undefined) {
          for (let i = 0; i < tmp.length; i++) {
            const data = {
              xAxis: tmp[i].x_axis.split('|'),
              yAxis: tmp[i].y_axis.split('|'),
              detailBoxPlot: [
                tmp[i].min_val,
                tmp[i].max_val,
                tmp[i].q1,
                tmp[i].q2,
                tmp[i].q3
              ],
              ...tmp[i]
            };
            tempDetail.push(data);
          }
          alert.show('필터 적용이 완료되었습니다.');
          setDetailDatas(tempDetail);
          setDetailLoading(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setDetailLoading(true);
        alert.show('필터 적용 실패');
      });
  };
  // null 제거
  const deleteNull = (index) => {
    const temp = [];
    filterCondition.forEach((item) => {
      if (detailDatas[index].col_name === item.slice(0, item.length - 3)) {
        const isNull = Number(item.slice(item.length - 2, item.length - 1));
        const isOutlier = Number(item.slice(item.length - 1, item.length));
        if (isNull === 1) {
          temp.push(`${detailDatas[index].col_name}=0${isOutlier}`);
        } else if (isNull === 0) {
          temp.push(`${detailDatas[index].col_name}=1${isOutlier}`);
        }
      } else {
        temp.push(item);
      }
    });
    setFilterCondition(temp);
    // detailDatas 업데이트
    getFilteredDetailData(temp);
  };

  // 아웃라이어 제거
  const deleteOutlier = (index) => {
    const temp = [];

    filterCondition.forEach((item) => {
      if (detailDatas[index].col_name === item.slice(0, item.length - 3)) {
        const isNull = Number(item.slice(item.length - 2, item.length - 1));
        const isOutlier = Number(item.slice(item.length - 1, item.length));
        if (isOutlier === 1) {
          temp.push(`${detailDatas[index].col_name}=${isNull}0`);
          // console.log(isClicked);
        } else if (isOutlier === 0) {
          temp.push(`${detailDatas[index].col_name}=${isNull}1`);
          if (!isClicked.includes(detailDatas[index].col_name)) {
            // console.log(isClicked);
            isClicked.push(detailDatas[index].col_name);
          }
        }
      } else {
        temp.push(item);
      }
    });
    setDetailLoading(false);
    setFilterCondition(temp);
    // detailDatas 업데이트
    getFilteredDetailData(temp);
  };

  const NullButton = ({ detailData, index }) => {
    const { col_name } = detailData;
    if (
      originalColumnDatas === undefined ||
      originalColumnDatas === null ||
      originalColumnDatas[index].x_axis.length <= 0
    )
      return (
        <Button sx={{ m: 1 }} disabled color="primary">
          NULL 100%
        </Button>
      );
    else if (originalColumnDatas[index].null_cnt === 0) {
      return (
        <Button sx={{ m: 1 }} disabled color="primary">
          NULL 없음
        </Button>
      );
    } else {
      return (
        <Tooltip title={NullErase}>
          <Button
            sx={{ m: 1 }}
            variant={
              Array.from(filterCondition).includes(`${col_name}=00`) ||
              Array.from(filterCondition).includes(`${col_name}=01`)
                ? 'outlined'
                : 'contained'
            }
            color="secondary"
            onClick={() => deleteNull(index)}
          >
            Null
          </Button>
        </Tooltip>
      );
    }
  };

  const OutlierButton = ({ detailData, index }) => {
    const { outlier_cnt, dtype, p_value, skewness, col_name } = detailData;
    // 즉시발동함수
    // console.log(isClicked.includes(col_name));
    if (outlier_cnt === 0 && !isClicked.includes(col_name)) {
      return (
        <Button sx={{ m: 1 }} disabled color="primary">
          이상치 없음
        </Button>
      );
    } else if (dtype === 'object') {
      return null;
    } else if (dtype === 'bool') {
      return null;
    } else if (p_value > '0.5') {
      return (
        <Tooltip title={modifiedZScore}>
          <Button
            sx={{ m: 1 }}
            variant={
              Array.from(filterCondition).includes(`${col_name}=00`) ||
              Array.from(filterCondition).includes(`${col_name}=10`)
                ? 'outlined'
                : 'contained'
            }
            color="primary"
            onClick={() => deleteOutlier(index)}
          >
            Outlier
          </Button>
        </Tooltip>
      );
    } else if (Math.abs(skewness) < 2) {
      return (
        <Tooltip title={IQR}>
          <Button
            sx={{ m: 1 }}
            variant={
              Array.from(filterCondition).includes(`${col_name}=00`) ||
              Array.from(filterCondition).includes(`${col_name}=10`)
                ? 'outlined'
                : 'contained'
            }
            color="primary"
            onClick={() => deleteOutlier(index)}
          >
            Outlier
          </Button>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip title={SIQR}>
          <Button
            sx={{ m: 1 }}
            variant={
              Array.from(filterCondition).includes(
                `${detailData.col_name}=00`
              ) ||
              Array.from(filterCondition).includes(`${detailData.col_name}=10`)
                ? 'outlined'
                : 'contained'
            }
            color="primary"
            onClick={() => deleteOutlier(index)}
          >
            Outlier
          </Button>
        </Tooltip>
      );
    }
  };
  useEffect(() => {
    getDetailData();
    getDataSets();
    return () => {
      setDetailDatas([]);
      setOriginColumnDatas([]);
    };
  }, []);
  // console.log(detailLoading);
  return (
    <Wrapper>
      <Between>
        <Title>
          <AlbumIcon />
          <p>
            {id}. {datasetName}
          </p>
        </Title>
        <Buttons style={{ marginTop: '0px' }}>
          <Button className="back" onClick={goDL}>
            List
          </Button>
          <Button className="home" onClick={goHome}>
            Home
          </Button>
        </Buttons>
      </Between>
      <Container maxWidth="xl">
        <SelectButton id={id} />
        <h2>Column Detail</h2>
        <SelectColumn id={id} />
        <h5>* 범주형 데이터는 Null 값 처리만 가능합니다.</h5>
        {!detailLoading && <LoadingDetail />}
        {detailDatas.length >= 5 && (
          <ScrollWrapper>
            <ScrollHorizontal
              reverseScroll
              config={config}
              className="scroll-horizontal"
              style={{ paddingBottom: '40px' }}
            >
              {detailDatas.length >= 1 &&
                detailDatas.map((detailData, index) => (
                  <DSWrapper style={{ marginRight: '3rem' }}>
                    <DataStatistics detail={detailData} />
                    <EraseButton>
                      <NullButton detailData={detailData} index={index} />
                      <OutlierButton detailData={detailData} index={index} />
                    </EraseButton>
                  </DSWrapper>
                ))}
            </ScrollHorizontal>
            <hr />
          </ScrollWrapper>
        )}
        {/* for 문 */}
        {detailDatas.length >= 1 &&
          detailDatas.map((detailData, index) => (
            <GraphWrapper>
              {detailData.dtype === 'int64' ||
              detailData.dtype === 'float64' ? (
                originalColumnDatas !== undefined &&
                originalColumnDatas !== null &&
                originalColumnDatas[index].x_axis.length >= 1 ? (
                  <BoxPlotWrapper style={{ width: '20rem' }}>
                    <BoxPlotChart detail={detailData} />
                  </BoxPlotWrapper>
                ) : (
                  <NullWrapper>Null 100%</NullWrapper>
                )
              ) : (
                <DoughnutWrapper style={{ width: '20rem' }}>
                  <DoughnutChart
                    xAxis={detailData.xAxis}
                    yAxis={detailData.yAxis}
                  />
                </DoughnutWrapper>
              )}
              {originalColumnDatas !== undefined &&
              originalColumnDatas !== null &&
              originalColumnDatas[index].x_axis.length >= 1 ? (
                <HistogramWrapper style={{ width: '20rem' }}>
                  <Histogram
                    xAxis={detailData.xAxis}
                    yAxis={detailData.yAxis}
                  />
                </HistogramWrapper>
              ) : (
                <NullWrapper>Null 100%</NullWrapper>
              )}
              <DSWrapper>
                <DataStatistics
                  isOrigin
                  detail={originalColumnDatas[index]}
                  style={{ width: '15rem' }}
                />
                <EraseButton>
                  <NullButton detailData={detailData} index={index} />
                  <OutlierButton detailData={detailData} index={index} />
                </EraseButton>
              </DSWrapper>
              {/* 필터링 적용 후 */}
              <DataStatistics
                isOrigin={false}
                detail={detailData}
                style={{ width: '15rem' }}
              />
            </GraphWrapper>
          ))}
      </Container>
    </Wrapper>
  );
}

export default DetailColumn;

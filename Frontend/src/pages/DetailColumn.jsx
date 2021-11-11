import React, { useEffect, useState } from 'react';
import AlbumIcon from '@mui/icons-material/Album';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useHistory } from 'react-router';
import ScrollHorizontal from 'react-scroll-horizontal';
import axios from 'axios';
import { overallInfoState } from '../recoil/overallAtom';
import {
  detailDataState,
  detailColumnState,
  selectedColumnState
} from '../recoil/detailAtom';
import DataStatistics from '../components/DataStatistics';
import BoxPlotChart from '../components/charts/BoxPlotChart';
import Histogram from '../components/charts/Histogram';
import DoughnutChart from '../components/charts/DoughnutChart';
import SelectColumn from '../components/SelectColumn';

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
  align-items: center;
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
  margin-top: 1rem;
`;

const BoxPlotWrapper = styled.div`
  width: 25%;
  max-width: 30%;
`;
const HistogramWrapper = styled.div`
  width: 25%;
  max-width: 30%;
`;

const DoughnutWrapper = styled.div`
  width: 25%;
  max-width: 30%;
`;

const GraphWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const DSWrapper = styled.div`
  margin-right: 3rem;
`;

const ScrollWrapper = styled.div`
  color: black;
  height: 18em;
  transform: ${(props) =>
    props.length < 5 || 'translate3d(0px,0px,0px) !important'};
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
  const [detailDatas, setDetailDatas] = useRecoilState(detailDataState);
  // 히스토그램에 보내줄 x, y축 정보만
  const [columns, setColumns] = useState([]);
  const overallInfos = useRecoilValue(overallInfoState);
  const setDetailColumns = useSetRecoilState(detailColumnState);
  const setSelectedColumns = useSetRecoilState(selectedColumnState);
  const config = { stiffness: detailDatas.length <= 4 ? 3 : 100 };

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
        // 초기 column names 5개 저장
        const temp = [];
        for (let i = 0; i < res.data.length; i++) {
          temp.push(res.data[i].col_name);
        }
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDetailData();
    getDataSets();
    // x, y축 전처리 위해 추가 코드
    if (detailDatas.length > 0) {
      detailDatas.forEach((data) => {
        const column = {
          dtype: data.dtype,
          xAxis: data.x_axis.split('|'),
          yAxis: data.y_axis.split('|')
        };
        setColumns(column);
        console.log('히스토', column);
        console.log(columns);
      });
    }
    return () => {
      setDetailDatas([]);
      // setColumns([]);
    };
  }, []);

  return (
    <Wrapper>
      <Between>
        <Title>
          <AlbumIcon />
          <p>
            {id}. {overallInfos.title}
          </p>
        </Title>
        <Buttons>
          <Button className="back" onClick={goDL}>
            Back
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
        <ScrollWrapper length={detailDatas.length}>
          <ScrollHorizontal
            reverseScroll
            config={config}
            className="scroll-horizontal"
          >
            {detailDatas.length >= 1 &&
              detailDatas.map((detailData) => (
                <DSWrapper>
                  <DataStatistics detail={detailData} />
                </DSWrapper>
              ))}
          </ScrollHorizontal>
        </ScrollWrapper>
        <hr />
        {/* for 문 */}
        {detailDatas.length >= 1 &&
          detailDatas.map((detailData) => (
            <GraphWrapper>
              {/* <h4>{{ detailData 제발 여기 column name 쓰고싶어요 }}</h4> */}
              {detailData.dtype === 'int64' ||
              detailData.dtype === 'float64' ? (
                <BoxPlotWrapper>
                  <BoxPlotChart detail={detailData} />
                </BoxPlotWrapper>
              ) : (
                <DoughnutWrapper>
                  <DoughnutChart
                    xAxis={detailData.xAxis}
                    yAxis={detailData.yAxis}
                  />
                </DoughnutWrapper>
              )}
              <HistogramWrapper>
                <Histogram xAxis={detailData.xAxis} yAxis={detailData.yAxis} />
              </HistogramWrapper>
              <DataStatistics detail={detailData} />
              {/* 필터링 적용 후 */}
              <DataStatistics />
            </GraphWrapper>
          ))}
      </Container>
    </Wrapper>
  );
}

export default DetailColumn;

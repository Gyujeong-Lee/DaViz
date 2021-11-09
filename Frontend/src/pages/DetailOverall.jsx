import React, { useEffect } from 'react';
import AlbumIcon from '@mui/icons-material/Album';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useHistory } from 'react-router';
import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  overallDataState,
  overallInfoState,
  overallOriginDataState,
  overallIdState,
  overallLoadingState
} from '../recoil/overallAtom';
import DataTable from '../components/DataTable';
import LoadingOverall from '../components/LoadingOverall';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
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

const Header = styled.div`
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

const SubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  .downloadBtn {
    margin-top: auto;
    margin-bottom: auto;
  }
`;

const LoadingOverallPage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;
// Overall - Column 전환 버튼
function SelectButton({ id }) {
  const history = useHistory();

  return (
    <Buttons>
      <Stack spacing={2} direction="row">
        <Button variant="contained">Overall</Button>
        <Button
          variant="outlined"
          onClick={() => history.push(`/${id}/detail/column`)}
        >
          Column
        </Button>
      </Stack>
    </Buttons>
  );
}

function DetailOverall({ match }) {
  const history = useHistory();
  const setOverallDatas = useSetRecoilState(overallDataState);
  const setOverallOriginDatas = useSetRecoilState(overallOriginDataState);
  const [overallInfos, setOverallInfos] = useRecoilState(overallInfoState);
  const [overallId, setOverallId] = useRecoilState(overallIdState);
  const [overallLoading, setOverallLoading] =
    useRecoilState(overallLoadingState);

  const {
    params: { id }
  } = match;

  const goHome = () => {
    history.push('/');
  };

  const goDL = () => {
    history.push('/datalist');
  };

  const downloadFile = () => {
    window.open(overallInfos.file);
  };

  const getDataSets = async () => {
    await axios
      .get(`/datasets/${id}/overall`)
      .then((res) => {
        const original = JSON.parse(res.data.origin);
        setOverallDatas(res.data.result);
        setOverallInfos(res.data.info);
        // 원본 데이터 index값 제거
        const originData = original.data;
        for (let i = 0; i < originData.length; i++) {
          originData[i].splice(0, 1);
        }
        setOverallOriginDatas(originData);
        setOverallId(id);
        setOverallLoading(true);
      })
      .catch((err) => {
        console.log(err);
        setOverallLoading(true);
      });
  };

  useEffect(() => {
    if (overallId !== id) {
      setOverallLoading(false);
      getDataSets();
    } else {
      setOverallLoading(true);
    }
  }, []);

  return (
    <>
      {!overallLoading ? (
        <LoadingOverallPage>
          <LoadingOverall />
        </LoadingOverallPage>
      ) : (
        <Wrapper>
          <Header>
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
          </Header>
          <Container maxWidth="xl">
            <SelectButton id={id} />
            <SubTitle>
              <h2># {overallInfos.title}</h2>
              <Button
                className="downloadBtn"
                color="info"
                onClick={downloadFile}
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Download
              </Button>
            </SubTitle>
            <DataTable key={id} />
          </Container>
        </Wrapper>
      )}
    </>
  );
}

export default DetailOverall;

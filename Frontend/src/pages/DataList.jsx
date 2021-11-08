import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import axios from 'axios';
import qs from 'qs'; // url 쿼리 값 읽기

import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import DataPreview from '../components/DataPreview';
import SearchBar from '../components/SearchBar';

const Wrapper = styled.div`
  background-color: #ffffff;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 70%;
  margin: auto;
  margin-bottom: 30px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  margin-bottom: 30px;
  color: #0076be;
  font-size: 1.3rem;
`;

function DataList({ location }) {
  const history = useHistory();
  const [dataset, setDataset] = useState([]);

  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

  const goHome = () => {
    history.push('/');
  };

  useEffect(() => {
    if (query.q !== undefined && query.q !== '') {
      axios
        .get(`/boards/search/${query.q}`)
        .then((res) => {
          setDataset(res.data);
        })
        .catch(() => {
          setDataset([]);
        });
    } else {
      axios
        .get('/boards/')
        .then((res) => {
          setDataset(res.data);
        })
        .catch(() => {
          setDataset([]);
        });
    }
  }, [query.q]);

  return (
    <Wrapper>
      <Title>
        {query.q !== undefined && query.q !== '' ? (
          <Typography variant="h3" mt={4} mb={4}>
            {query.q} 검색 결과
          </Typography>
        ) : (
          <Typography variant="h3" mt={4} mb={4}>
            DATASET LIST
          </Typography>
        )}
      </Title>
      <SearchBar />
      <ButtonWrapper>
        <Button
          className="homeBtn"
          variant="contained"
          endIcon={<HomeIcon />}
          onClick={goHome}
        >
          Home
        </Button>
      </ButtonWrapper>
      {query.q !== undefined || query.q !== '' ? (
        <div>
          {dataset.map((data, index) => (
            <DataPreview key={data.id} data={data} idx={index} />
          ))}
        </div>
      ) : (
        <Typography
          variant="h3"
          component="div"
          align="center"
          color="primary"
          mt={5}
        >
          검색 결과가 존재하지 않습니다.
        </Typography>
      )}
    </Wrapper>
  );
}

export default DataList;

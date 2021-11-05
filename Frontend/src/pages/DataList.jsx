import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import axios from 'axios';
import qs from 'qs'; // url 쿼리 값 읽기

import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
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
    return () => {
      console.log('unmount');
    };
  }, [query.q]);

  return (
    <Wrapper>
      <Title>
        {query.q !== undefined && query.q !== '' ? (
          <h1>{query.q} 검색 결과</h1>
        ) : (
          <h1>Data List</h1>
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
      {dataset.length > 0 ? (
        <div>
          {dataset.map((data) => (
            <DataPreview key={data.id} data={data} />
          ))}
        </div>
      ) : (
        <div>검색된 데이터가 없습니다.</div>
      )}
    </Wrapper>
  );
}

export default DataList;

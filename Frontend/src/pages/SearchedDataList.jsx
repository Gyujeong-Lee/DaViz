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

function SearchedDataList({ location }) {
  const history = useHistory();
  const [dataset, setDataset] = useState([]);

  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

  const goHome = () => {
    history.push('/');
  };

  useEffect(() => {
    axios
      .get(`/boards/search/${query.q}`)
      .then((res) => {
        setDataset(res.data);
        console.log(dataset);
      })
      .catch(() => {
        setDataset([]);
      });
    return () => {
      console.log('unmount');
    };
  }, [query.q]);

  return (
    <Wrapper>
      <Title>
        <h1>{query.q} 검색 결과</h1>
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
      <div>
        {dataset.map((data) => (
          <DataPreview key={data.id} data={data} />
        ))}
      </div>
    </Wrapper>
  );
}

export default SearchedDataList;

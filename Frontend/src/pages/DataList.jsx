import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import axios from 'axios';

import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import DataPreview from '../components/DataPreview';

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

function DataList() {
  const history = useHistory();
  const [dataset, setDataset] = useState([]);

  const goHome = () => {
    history.push('/');
  };

  useEffect(() => {
    axios
      .get('/boards/')
      .then((res) => {
        setDataset(res.data);
        console.log(dataset);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      console.log('unmount');
    };
  }, []);

  return (
    <Wrapper>
      <Title>
        <h1>Data List</h1>
      </Title>
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

export default DataList;

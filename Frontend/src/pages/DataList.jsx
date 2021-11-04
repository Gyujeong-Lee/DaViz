import React from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import styled from 'styled-components';
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
  const goHome = () => {
    history.push('/');
  };

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
        <DataPreview />
        <DataPreview />
        <DataPreview />
        <DataPreview />
      </div>
    </Wrapper>
  );
}

export default DataList;

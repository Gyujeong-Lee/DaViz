import React from 'react';
import AlbumIcon from '@mui/icons-material/Album';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useHistory } from 'react-router';
import DataStatistics from '../components/DataStatistics';

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
    font-size: 1.4rem;
    margin-right: 2.5rem;
    cursor: pointer;
  }
  .home:hover {
    opacity: 0.5;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

// Overall - Column 전환 버튼
function SelectButton() {
  const history = useHistory();

  return (
    <Buttons>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={() => history.push('/1/detail')}>
          Overall
        </Button>
        <Button variant="contained">Column</Button>
      </Stack>
    </Buttons>
  );
}

function DetailColumn() {
  const history = useHistory();
  const goHome = () => {
    history.push('/');
  };

  return (
    <>
      <Wrapper>
        <Between>
          <Title>
            <AlbumIcon />
            <p>Data Title</p>
          </Title>
          <Button className="home" onClick={goHome}>
            Home
          </Button>
        </Between>
        <Container maxWidth="xl">
          <SelectButton />
          <h2>세부 사항</h2>
          <DataStatistics />
          <hr />
        </Container>
      </Wrapper>
    </>
  );
}

export default DetailColumn;

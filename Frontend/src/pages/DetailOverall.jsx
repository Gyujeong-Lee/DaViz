import React from 'react';
import AlbumIcon from '@mui/icons-material/Album';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useHistory } from 'react-router';
import DataTable from '../components/DataTable';
// import BoxPlotChart from '../components/charts/BoxPlotChart';
import DoughnutChart from '../components/charts/DoughnutChart';

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

const BoxPlotWrapper = styled.div`
  max-width: 30%;
  display: flex;
  justify-content: center;
`;

// Overall - Column 전환 버튼
function SelectButton() {
  const history = useHistory();

  return (
    <Buttons>
      <Stack spacing={2} direction="row">
        <Button variant="contained">Overall</Button>
        <Button
          variant="outlined"
          onClick={() => history.push('/1/detail/column')}
        >
          Column
        </Button>
      </Stack>
    </Buttons>
  );
}

function DetailOverall({ match }) {
  const history = useHistory();
  const {
    params: { id }
  } = match;

  const goHome = () => {
    history.push('/');
  };

  const goDL = () => {
    history.push('/datalist');
  };

  return (
    <Wrapper>
      <Header>
        <Title>
          <AlbumIcon />
          <p>{id} Data Title</p>
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
        <SelectButton />
        <h2>#Data Name</h2>
        <DataTable key={id} />
        <BoxPlotWrapper>
          <DoughnutChart />
        </BoxPlotWrapper>
      </Container>
    </Wrapper>
  );
}

export default DetailOverall;

import React, { useState } from 'react';
import AlbumIcon from '@mui/icons-material/Album';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  color: #ffffff;
  background-color: #0076be;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  margin-bottom: 0.1rem;
  p {
    margin-left: 0.5rem;
    align-self: center;
    font-size: 1.25rem;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  margin-right: 5rem;
`;

function DetailOverall() {
  const [selectedBtn, setSelectedBtn] = useState(0);

  const overallClick = () => {
    setSelectedBtn(0);
    console.log(selectedBtn);
  };

  const columnClick = () => {
    setSelectedBtn(1);
    console.log(selectedBtn);
  };

  return (
    <>
      <Wrapper>
        <Title>
          <AlbumIcon />
          <p>Data Title</p>
        </Title>
        <Buttons>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" onClick={overallClick}>
              Overall
            </Button>
            <Button variant="outlined" onClick={columnClick}>
              Column
            </Button>
          </Stack>
        </Buttons>
      </Wrapper>
    </>
  );
}

export default DetailOverall;

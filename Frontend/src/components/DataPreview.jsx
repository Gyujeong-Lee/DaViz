import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import AlbumIcon from '@mui/icons-material/Album';
import { useHistory } from 'react-router';

const PreviewBox = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  color: #0076be;
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

const Information = styled.div`
  padding-left: 1rem;
  font-weight: bold;
  margin: auto;
  color: #0076be;
  background-color: #ffffff;
  min-height: 30px;
  margin-bottom: 0.25rem;
`;

const Description = styled.div`
  align-items: center;
  padding-left: 1rem;
  margin: auto;
  color: #0076be;
  background-color: #ffffff;
  min-height: 40px;
  margin-bottom: 0.25rem;
  p {
    display: flex;
    align-items: center;
    margin: auto;
  }
`;

const Updated = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 0.7rem;
  color: #000000;
  background-color: #ffffff;
  min-height: 15px;
`;

export default function DataPreview() {
  const history = useHistory();

  return (
    <div>
      <PreviewBox>
        <Box
          component="div"
          sx={{
            minWidth: 750,
            minHeight: 185,
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
            borderBottom: '3px solid #d3d3d3',
            borderRadius: 1,
            backgroundColor: '#d3d3d3',
            '&:hover': {
              cursor: 'pointer',
              opacity: [0.9]
            }
          }}
          onClick={() => {
            history.push('/1/detail');
          }}
        >
          <Title>
            <AlbumIcon />
            <p>Data Title</p>
          </Title>
          <Information>
            <div>Data Info : ~~~</div>
            <div>Information</div>
          </Information>
          <Description>
            <div>
              <p>Data Classfication : ~~~~</p>
            </div>
            <div>
              <p>Data Description: ~~~~</p>
            </div>
          </Description>
          <Updated>
            <p>Last Updated</p>
            <p>10/20/2021</p>
          </Updated>
        </Box>
      </PreviewBox>
    </div>
  );
}

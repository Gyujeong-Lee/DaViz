import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { useHistory } from 'react-router';

const PreviewBox = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  color: #0076be;
  border-radius: 5px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 3.25rem;
  margin: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  color: #ffffff;
  background-color: #0076be;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  p {
    font-size: 0.9rem;
    letter-spacing: '1px';
  }
  h3 {
    left: 0;
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
  min-height: 43px;
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
            minHeight: 200,
            border: '1px solid #d3d3d3',
            borderRadius: 1,
            backgroundColor: '#d3d3d3',
            '&:hover': {
              cursor: 'pointer',
              opacity: [0.95]
            }
          }}
          onClick={() => {
            history.push('/'); // 데이터 detail로 변경하기
          }}
        >
          <Title>
            <h3>Data Title</h3>
            <p>SAAS-0000</p>
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

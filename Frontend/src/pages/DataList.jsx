import React from 'react';
import styled from 'styled-components';
import DataPreview from '../components/DataPreview';

const Wrapper = styled.div`
  background-color: #ffffff;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  color: #0076be;
  font-size: 1.3rem;
`;

function DataList() {
  return (
    <Wrapper>
      <Title>
        <h1>DataList</h1>
      </Title>
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

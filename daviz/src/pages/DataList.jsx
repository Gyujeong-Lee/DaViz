import React from 'react';
import styled from 'styled-components';
import DataPreview from '../components/DataPreview';

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  color: #0076be;
`;

function DataList() {
  return (
    <>
      <Title>
        <h1>DataList</h1>
      </Title>
      <>
        <DataPreview />
        <DataPreview />
        <DataPreview />
        <DataPreview />
      </>
    </>
  );
}

export default DataList;

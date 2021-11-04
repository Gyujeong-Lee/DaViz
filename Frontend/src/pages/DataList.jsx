import axios from 'axios';
import React, { useState, useEffect } from 'react';
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
  const [dataset, setDataset] = useState([]);

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
        <h1>DataList</h1>
      </Title>
      <div>
        {dataset.map((data) => (
          <DataPreview key={data.id} data={data} />
        ))}
      </div>
    </Wrapper>
  );
}

export default DataList;

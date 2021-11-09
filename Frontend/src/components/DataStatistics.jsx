import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CardContents = styled(CardContent)`
  background-color: #0076be;
  width: 280px;
  color: white;
  li {
    color: white;
  }
  h2 {
    color: white;
  }
`;

export default function DataStatistics(props) {
  const { detail } = props;
  const [data, setData] = useState({
    id: null,
    name: null
  });
  useEffect(() => {
    if (detail !== undefined) {
      setData(detail);
    }
  }, []);

  return (
    <div>
      <CardContents>
        <Typography gutterBottom variant="h5" component="div">
          id / {data.id} / {data.dtype}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <h2>{data.name}</h2>
          <ul>
            <li>Maximum: {data.max_val}</li>
            <li>Mean: {data.mean}</li>
            <li>Minimum: {data.min_val}</li>
            <li>Std: {data.std}</li>
            <li>
              Q1, Q2, Q3: {data.q1} {data.q2} {data.q3}
            </li>
            <li>Mode: {data.mode}</li>
            <li>Null: {data.null_cnt}</li>
          </ul>
        </Typography>
      </CardContents>
    </div>
  );
}

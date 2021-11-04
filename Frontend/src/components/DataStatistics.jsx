import * as React from 'react';
import Card from '@mui/material/Card';
import styled from 'styled-components';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Cards = styled(CardContent)`
  background-color: #0076be;
  color: white;
  li {
    color: white;
  }
  h2 {
    color: white;
  }
`;

export default function DataStatistics() {
  return (
    <Card>
      <Cards>
        <Typography gutterBottom variant="h5" component="div">
          # 1 - # column name
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <h2>column name (String)</h2>
          <ul>
            <li>Maximum: 30</li>
            <li>Mean: 30</li>
            <li>Minimum: 30</li>
            <li>Std: 30</li>
            <li>Q1, Q2, Q3: 30</li>
            <li>Mode: 30</li>
            <li>Null: 30</li>
          </ul>
        </Typography>
      </Cards>
    </Card>
  );
}

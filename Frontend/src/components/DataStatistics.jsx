import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CardContents = styled(CardContent)`
  background-color: #0076be;
  width: 280px;
  height: 230px;
  color: white;
  li {
    color: white;
  }
  h2 {
    color: white;
  }
  #stat_top {
    width: 260px;
    margin-left: 10px;
  }
  #stat_top > div {
    display: flex;
    justify-content: space-between;
  }
  #stat_top > div > span {
    margin-top: 6px;
    color: white;
  }
`;

export default function DataStatistics(props) {
  const { detail } = props;
  const [data, setData] = useState({
    id: null,
    name: null,
    col_name: null
  });
  const [mode, setMode] = useState('');

  useEffect(() => {
    console.log(detail);
    if (detail === undefined) {
      return;
    }
    setData(detail);
    if (detail.dtype === 'object') {
      setMode(detail.x_axis.split('|')[0]);
    }
  }, [detail]);

  return (
    <div id="top">
      <CardContents>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div># {data.col_name}</div>
          <div style={{ fontSize: '0.8rem' }}>({data.dtype})</div>
        </Typography>
        {data.dtype === 'int64' || data.dtype === 'float64' ? (
          <Typography variant="body2" color="text.secondary" id="stat_top">
            <h2>{data.name}</h2>
            <div>
              <span>Maximum</span>
              <span>{data.max_val.toFixed(2)}</span>
            </div>
            <div>
              <span>Mean</span>
              <span>{data.mean.toFixed(2)}</span>
            </div>
            <div>
              <span>Minimum</span>
              <span>{data.min_val.toFixed(2)}</span>
            </div>
            <div>
              <span>Std</span>
              <span>{data.std.toFixed(2)}</span>
            </div>
            <div>
              <span>Q1 / Q2 / Q3</span>
              <span>
                <span>{data.q1.toFixed(3)} / </span>
                <span>{data.q2.toFixed(3)} / </span>
                <span>{data.q3.toFixed(3)}</span>
              </span>
            </div>
            <div>
              <span>Mode</span>
              <span>{data.mode}</span>
            </div>
            <div>
              <span>Null</span>
              <span>{data.null_cnt}</span>
            </div>
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary" id="stat_top">
            <h2>{data.name}</h2>
            <div>
              <span>Unique Value</span>
              <span>{data.unique_cnt}</span>
            </div>
            <div>
              <span>Mode</span>
              <span>{mode}</span>
            </div>
            <div>
              <span>Null</span>
              <span>{data.null_cnt}</span>
            </div>
          </Typography>
        )}
      </CardContents>
    </div>
  );
}

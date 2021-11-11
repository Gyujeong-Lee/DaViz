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
  #stat_num {
    display: inline-block;
    width: 125px;
    margin-top: 5px;
    color: white;
  }
  #stat_obj {
    display: inline-block;
    width: 140px;
    margin-top: 5px;
    color: white;
  }
  #stat_num > div {
    margin-top: 6px;
  }
  #stat_obj > div {
    margin-top: 6px;
  }
  #stat_top {
    display: flex;
    justify-content: space-around;
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
            <div id="stat_num">
              <div>Maximum</div>
              <div>Mean</div>
              <div>Minimum</div>
              <div>Std</div>
              <div>Q1, Q2, Q3</div>
              <div>Mode</div>
              <div>Null</div>
            </div>
            <div id="stat_num">
              <div>{data.max_val}</div>
              <div>{data.mean}</div>
              <div>{data.min_val}</div>
              <div>{data.std}</div>
              <div>
                <span>{data.q1}, </span>
                <span>{data.q2}, </span>
                <span>{data.q3}</span>
              </div>
              <div>{data.mode}</div>
              <div>{data.null_cnt}</div>
            </div>
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary" id="stat_top">
            <h2>{data.name}</h2>
            <div id="stat_obj">
              <div>Unique Value</div>
              <div>Mode</div>
              <div>Null</div>
            </div>
            <div id="stat_obj">
              <div>{data.unique_cnt}</div>
              <div>{mode}</div>
              <div>{data.null_cnt}</div>
            </div>
            {/* <ul>
              <li>Unique Value: {data.unique_cnt}</li>
              <li>Mode: {mode}</li>
              <li>Null: {data.null_cnt}</li>
            </ul> */}
          </Typography>
        )}
      </CardContents>
    </div>
  );
}

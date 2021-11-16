import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Stat = styled.div`
  width: 300px;
  height: 280px;
  // color: white;

  div {
    display: flex;
    justify-content: space-between;
  }
`;

const CardContents = styled(CardContent)`
  background-color: #0583d1;
  width: 320px;
  height: 285px;
  color: white;
  border-radius: 8px;
  h2 {
    color: white;
  }
  #stat_top {
    width: 300px;
    margin-left: 5px;
  }
  #stat_top > div > span {
    margin-bottom: 2.5px;
    margin-top: 2.5px;
    color: white;
  }
  .name > div > span {
    color: black;
  }
`;

export default function DataStatistics(props) {
  const { detail, isOrigin } = props;
  const [data, setData] = useState({
    id: null,
    name: null,
    col_name: null
  });
  const [mode, setMode] = useState('');

  useEffect(() => {
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
          variant="h6"
          component="div"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <b>
              # {isOrigin && '(origin)'} {data.col_name}
            </b>
          </div>
          <div style={{ fontSize: '0.8rem' }}>({data.dtype})</div>
        </Typography>
        {data.dtype === 'int64' || data.dtype === 'float64' ? (
          <Typography variant="body2" color="text.secondary" id="stat_top">
            <h2>{data.name}</h2>
            {data.x_axis.length >= 1 ? (
              <Stat id="stat_top">
                <div>
                  <span>Maximum</span>
                  <span>
                    {typeof data.max_val === 'number'
                      ? data.max_val.toFixed(2)
                      : data.max_val}
                  </span>
                </div>
                <div>
                  <span>Mean</span>
                  <span>
                    {typeof data.mean === 'number'
                      ? data.mean.toFixed(2)
                      : data.mean}
                  </span>
                </div>
                <div>
                  <span>Minimum</span>
                  <span>
                    {typeof data.min_val === 'number'
                      ? data.min_val.toFixed(2)
                      : data.min_val}
                  </span>
                </div>
                <div>
                  <span>Std</span>
                  <span>
                    {typeof data.std === 'number'
                      ? data.std.toFixed(2)
                      : data.std}
                  </span>
                </div>
                <hr />
                <div>
                  <span>Q1</span>
                  <span>
                    {typeof data.q1 === 'number' ? data.q1.toFixed(2) : data.q1}
                  </span>
                </div>
                <div>
                  <span>Q2</span>
                  <span>
                    {typeof data.q2 === 'number' ? data.q2.toFixed(2) : data.q2}
                  </span>
                </div>
                <div>
                  <span>Q3</span>
                  <span>
                    {typeof data.q3 === 'number' ? data.q3.toFixed(2) : data.q3}
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
              </Stat>
            ) : (
              <Stat id="stat_top">
                <div>
                  <span>Null</span>
                  <span>{data.null_cnt}</span>
                </div>
              </Stat>
            )}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary" id="stat_top">
            <Stat id="stat_top">
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
            </Stat>
          </Typography>
        )}
      </CardContents>
    </div>
  );
}

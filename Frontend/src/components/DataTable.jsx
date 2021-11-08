import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { overallDataState, overallOriginDataState } from '../utils/state';
import Histogram from './charts/Histogram';
import DoughnutChart from './charts/DoughnutChart';

const NullData = styled.div`
  display: flex;
  justify-content: space-around;
  color: red;
`;

export default function DataTable(props) {
  const { key } = props;
  const overallDatas = useRecoilValue(overallDataState);
  const [columns, setColumns] = useState([]);
  const overallOriginDatas = useRecoilValue(overallOriginDataState);

  useEffect(() => {
    if (overallDatas.length > 0) {
      overallDatas.forEach((data) => {
        const column = {
          id: data.id,
          label: data.col_name,
          dtype: data.dtype,
          xAxis: data.x_axis.split('|'),
          yAxis: data.y_axis.split('|')
        };
        setColumns((col) => [...col, column]);
      });
    }
    return () => {
      setColumns([]);
    };
  }, [overallDatas]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ minHeight: 450 }}>
        <Table stickyHeader aria-label="sticky table">
          {/* Columns */}
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id + column.label + key}
                  align="right"
                  style={{ minWidth: 170, maxWidth: 170 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* Overall 그래프 */}
          <TableHead>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align="right"
                style={{ minWidth: 170, maxWidth: 170 }}
              >
                {column.xAxis.length > 1 ? (
                  column.dtype === 'int64' || column.dtype === 'float64' ? (
                    <Histogram xAxis={column.xAxis} yAxis={column.yAxis} />
                  ) : (
                    <DoughnutChart xAxis={column.xAxis} yAxis={column.yAxis} />
                  )
                ) : (
                  <NullData>
                    <span>[null]</span> <span>100%</span>
                  </NullData>
                )}
              </TableCell>
            ))}
          </TableHead>
          {/* dataset 원본 row 100개 출력 */}
          <TableBody>
            {overallOriginDatas.map((overallOriginData) => (
              <TableRow
                key={overallOriginData.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {overallOriginData.map((data) => (
                  <TableCell component="th" scope="row">
                    {data}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

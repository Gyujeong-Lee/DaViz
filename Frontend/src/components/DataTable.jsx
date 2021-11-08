import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { overallDataState } from '../utils/state';
import Histogram from './charts/Histogram';
import DoughnutChart from './charts/DoughnutChart';

const NullData = styled.div`
  display: flex;
  justify-content: space-around;
  color: red;
`;

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767)
// ];

export default function DataTable(props) {
  const { key } = props;
  const overallDatas = useRecoilValue(overallDataState);
  const [columns, setColumns] = React.useState([]);

  useEffect(() => {
    console.log(overallDatas);
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
          {/* <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align="right">
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody> */}
        </Table>
      </TableContainer>
    </Paper>
  );
}

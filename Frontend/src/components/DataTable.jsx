import React, { useEffect, useState, Suspense } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import {
  overallDataState,
  overallOriginDataState,
  overallIdState
} from '../recoil/overallAtom';
import LoadingDetail from './LoadingDetail';

const Histogram = React.lazy(() => import('./charts/Histogram'));
const DoughnutChart = React.lazy(() => import('./charts/DoughnutChart'));

const NullData = styled.div`
  display: flex;
  justify-content: space-around;
  color: red;
`;
const StickyTableCell = styled(TableCell)`
  && {
    top: 56.5px;
  }
`;

export default function DataTable(props) {
  const { key } = props;
  const [columns, setColumns] = useState([]);
  const overallDatas = useRecoilValue(overallDataState);
  const overallOriginDatas = useRecoilValue(overallOriginDataState);
  const overallId = useRecoilValue(overallIdState);

  useEffect(() => {
    if (overallDatas.length > 0 && overallId !== key) {
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
      <TableContainer sx={{ minHeight: 450, maxHeight: 800 }}>
        <Table stickyHeader aria-label="sticky table">
          {/* Columns */}
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id + column.label}
                  align="center"
                  style={{ minWidth: 170, maxWidth: 170 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* Overall 그래프 */}
          <TableHead>
            <Suspense fallback={<LoadingDetail loading />}>
              {columns.map((column) => (
                <StickyTableCell
                  key={column.id}
                  align="right"
                  style={{ minWidth: 170, maxWidth: 170 }}
                >
                  {column.xAxis.length > 1 ? (
                    column.dtype === 'int64' || column.dtype === 'float64' ? (
                      <Suspense fallback={<LoadingDetail loading={false} />}>
                        <Histogram
                          xAxis={column.xAxis}
                          yAxis={column.yAxis}
                          aspectRatio={columns.length < 4 ? 3.5 : 1}
                        />
                      </Suspense>
                    ) : (
                      <Suspense fallback={<LoadingDetail loading={false} />}>
                        <DoughnutChart
                          xAxis={column.xAxis}
                          yAxis={column.yAxis}
                          aspectRatio={columns.length < 4 ? 3.5 : 1}
                        />
                      </Suspense>
                    )
                  ) : (
                    <Suspense fallback={<LoadingDetail />}>
                      <NullData>
                        <span>[null]</span> <span>100%</span>
                      </NullData>
                    </Suspense>
                  )}
                </StickyTableCell>
              ))}
            </Suspense>
          </TableHead>
          {/* dataset 원본 row 100개 출력 */}
          <TableBody>
            {Array.from(overallOriginDatas).map((overallOriginData) => (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {Array.from(overallOriginData).map((data) => (
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    style={{ wordBreak: 'break-all' }}
                  >
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

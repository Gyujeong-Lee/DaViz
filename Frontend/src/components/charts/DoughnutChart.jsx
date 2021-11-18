import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';
import Tooltip from '@mui/material/Tooltip';

const Wrapper = styled.div`
  width: 85%;
  height: 85%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const mention = `
  상위 최대 5개의 항목을 보여줍니다.
`;

const DoughnutChart = ({ xAxis, yAxis, aspectRatio }) => {
  const chartContainer = useRef(null);
  const chartConfig = {
    type: 'doughnut',
    data: {
      // x축 데이터
      labels: xAxis,
      datasets: [
        {
          // y축 데이터
          data: yAxis,
          borderWidth: 1,
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ]
        }
      ]
    },
    options: {
      responsive: true,
      aspectRatio: aspectRatio,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: false
        }
      },
      scales: {
        yAxis: {
          display: false
        }
      }
    }
  };

  useEffect(() => {
    const newChartInstance = new Chart(chartContainer.current, chartConfig);
    return () => {
      newChartInstance.destroy();
    };
  }, [chartContainer]);

  return (
    <Wrapper>
      <Tooltip title={mention}>
        <canvas ref={chartContainer} />
      </Tooltip>
    </Wrapper>
  );
};

export default DoughnutChart;

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';

const Wrapper = styled.div`
  min-width: 120px;
  max-width: 150px;
`;

const DoughnutChart = ({ xAxis, yAxis }) => {
  const chartContainer = useRef(null);

  const chartConfig = {
    type: 'doughnut',
    data: {
      // x축 데이터
      labels: yAxis,
      datasets: [
        {
          // y축 데이터
          data: xAxis,
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
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: false
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
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
      <canvas ref={chartContainer} />
    </Wrapper>
  );
};

export default DoughnutChart;

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';

const Wrapper = styled.div`
  min-width: 150px;
  max-width: 180px;
  width: 60%;
  // height: 350px;
`;

const randomInt = () => Math.floor(Math.random() * (10 - 1 + 1)) + 1;

const DoughnutChart = () => {
  const chartContainer = useRef(null);

  const dataset = [
    randomInt(),
    randomInt(),
    randomInt(),
    randomInt(),
    randomInt()
  ];
  const label = ['A', 'B', 'C', 'D', 'E'];

  const chartConfig = {
    type: 'doughnut',
    data: {
      // x축 데이터
      labels: label,
      datasets: [
        {
          // y축 데이터
          data: dataset,
          borderWidth: 1,
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
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

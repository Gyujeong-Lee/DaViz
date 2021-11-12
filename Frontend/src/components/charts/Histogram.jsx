import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Histogram = ({ xAxis, yAxis }) => {
  const chartContainer = useRef(null);

  const chartConfig = {
    type: 'bar',
    data: {
      // x축
      labels: xAxis,
      datasets: [
        {
          // y축
          data: yAxis,
          borderWidth: 1,
          backgroundColor: ['rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)']
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
        y: {
          beginAtZero: true
        }
      }
    }
  };

  useEffect(() => {
    const newChartInstance = new Chart(chartContainer.current, chartConfig);
    return () => {
      newChartInstance.destroy();
    };
  }, [chartContainer, xAxis, yAxis]);

  return (
    <Wrapper>
      <canvas ref={chartContainer} width="100" height="100" />
    </Wrapper>
  );
};

export default Histogram;

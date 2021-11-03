import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';

const Wrapper = styled.div`
  width: 100%;
  // height: 80%;
`;

const Histogram = () => {
  const chartContainer = useRef(null);

  const chartConfig = {
    type: 'bar',
    data: {
      // x축
      labels: [
        'Red',
        'Blue',
        'Yellow',
        'Green',
        'Purple',
        'Orange',
        'Red',
        'Blue',
        'Yellow',
        'Green',
        'Purple',
        'Orange'
      ],
      datasets: [
        {
          // y축
          data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
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

export default Histogram;

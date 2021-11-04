import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';
import { BoxPlotController } from '@sgratzl/chartjs-chart-boxplot';

Chart.register(BoxPlotController);

const Wrapper = styled.div`
  .canvas: {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
`;

const BoxPlotChart = () => {
  const chartContainer = useRef(null);

  const label = ['title'];
  const columnData = [[-5, -3, -1, 5, 9]]; // [min, max, q1, q2, q3]

  const chartConfig = {
    type: 'boxplot',
    data: {
      labels: label,
      datasets: [
        {
          label: 'title',
          backgroundColor: 'rgba(255,0,0,0.5)',
          borderColor: 'red',
          borderWidth: 1,
          outlierColor: '#ffffff',
          padding: 25,
          itemRadius: 0,
          data: columnData
        }
      ]
    },
    tooltips: {
      mode: 'index',
      intersect: false
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: {
          display: false,
          position: 'top'
        },
        title: {
          display: false
        }
      },
      scales: {
        xAxes: [
          {
            categoryPercentage: 0.5,
            barPercentage: 0.7
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
      <canvas ref={chartContainer} width="100" height="100" />
    </Wrapper>
  );
};

export default BoxPlotChart;

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';
import { BoxPlotController } from '@sgratzl/chartjs-chart-boxplot';
import Tooltip from '@mui/material/Tooltip';

Chart.register(BoxPlotController);

const Wrapper = styled.div`
  .canvas: {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
`;
const mention = `
  이상치 범위를 확인할 수 있는 박스플롯입니다.
`;

const BoxPlotChart = (props) => {
  const { detail } = props;
  const chartContainer = useRef(null);

  const label = [''];

  const chartConfig = {
    type: 'boxplot',
    data: {
      labels: label,
      datasets: [
        {
          label: detail.col_name,
          backgroundColor: 'rgba(38,139,238,0.5)',
          borderColor: 'rgba(38,139,238)',
          borderWidth: 1,
          outlierColor: '#ffffff',
          padding: 20,
          itemRadius: 0,
          data: [detail.detailBoxPlot]
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
        x: {
          categoryPercentage: 0.5,
          barPercentage: 0.7
        }
      }
    }
  };

  useEffect(() => {
    const newChartInstance = new Chart(chartContainer.current, chartConfig);
    return () => {
      newChartInstance.destroy();
    };
  }, [chartContainer, detail]);

  return (
    <Wrapper>
      <Tooltip title={mention}>
        <canvas ref={chartContainer} width="100" height="100" />
      </Tooltip>
    </Wrapper>
  );
};

export default BoxPlotChart;

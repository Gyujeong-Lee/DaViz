import React, { useState, useEffect, useRef } from 'react';
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

const BoxPlotChart = (props) => {
  const { detail } = props;
  console.log('데이터 확인', detail);
  const [columns, setColumns] = useState([]);
  const [labelName, setLabelName] = useState('');
  const chartContainer = useRef(null);

  useEffect(() => {
    console.log('박플', detail);
    if (detail !== undefined) {
      if (detail.dtype !== 'object') {
        const column = [[//eslint-disable-line
          detail.max_val,//eslint-disable-line
          detail.min_val,//eslint-disable-line
          detail.q1,//eslint-disable-line
          detail.q2,//eslint-disable-line
          detail.q3//eslint-disable-line
        ]];//eslint-disable-line
        console.log(column, '잘 넣었니');
        setColumns(column);
        setLabelName(detail.col_name);
      }
      console.log('어차피 안 찍혀', columns);
    }
  }, [detail]);

  const label = ['result'];

  const chartConfig = {
    type: 'boxplot',
    data: {
      labels: label,
      datasets: [
        {
          label: labelName,
          backgroundColor: 'rgba(38,139,238,0.5)',
          borderColor: 'rgba(38,139,238)',
          borderWidth: 1,
          outlierColor: '#ffffff',
          padding: 20,
          itemRadius: 0,
          data: columns
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

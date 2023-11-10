import React from 'react';
import styled from 'styled-components';
import { Color } from '@styles/theme';
import ApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// hooks
import useTheme from '@hooks/useTheme';

/** 컬럼 차트 컴포넌트 */
const ColumnChart = () => {
  const { currentTheme } = useTheme();

  // 차트 옵션
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      foreColor: currentTheme === 'DARK' ? Color.chart.textWhite : Color.chart.textBlack,
    },
    colors: [Color.chart.blue, Color.chart.green, Color.chart.orange],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      labels: {
        style: {
          colors: currentTheme === 'DARK' ? Color.chart.textWhite : Color.chart.textBlack,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: currentTheme === 'DARK' ? Color.chart.textWhite : Color.chart.textBlack,
        },
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '60%', // 막대의 너비를 조절하여 간격 조절
      },
    },
  };

  // 시리즈 데이터
  const series: ApexAxisChartSeries = [
    {
      name: '테스트 데이터',
      data: [10, 20, 30, 40, 50, 60, 70, 80, 90],
    },
    {
      name: '테스트 데이터2',
      data: [5, 3, 20, 12, 18, 32, 60, 55, 72],
    },
    {
      name: '테스트 데이터3',
      data: [2, 1, 10, 70, 50, 42, 99, 5, 25],
    },
  ];

  return <ApexChart options={options} series={series} type="bar" height={400}></ApexChart>;
};

export default ColumnChart;

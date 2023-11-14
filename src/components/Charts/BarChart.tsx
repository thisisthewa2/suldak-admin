import React from 'react';
import { Color } from '@styles/theme';
import ApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// hooks
import useTheme from '@hooks/useTheme';

/** 바 차트 컴포넌트 */
const BarChart = () => {
  const { currentTheme } = useTheme();

  // 차트 옵션
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      foreColor: currentTheme === 'DARK' ? Color.chart.textWhite : Color.chart.textBlack,
    },
    colors: [Color.chart.blue],
    xaxis: {
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
        horizontal: true,
        columnWidth: '60%', // 막대의 너비를 조절하여 간격 조절
      },
    },
  };

  const series: ApexAxisChartSeries = [
    {
      data: [
        {
          x: 'category A',
          y: 10,
        },
        {
          x: 'category B',
          y: 18,
        },
        {
          x: 'category C',
          y: 13,
        },
      ],
    },
  ];

  return <ApexChart options={options} series={series} type="bar" height={400}></ApexChart>;
};

export default BarChart;

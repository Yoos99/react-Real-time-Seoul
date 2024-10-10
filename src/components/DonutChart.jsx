import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Chart.js에서 사용할 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart({ data }) {
  // 도넛 차트를 위한 데이터 설정
  const chartData = {
    labels: ['10대', '20대', '30대', '40대', '50대', '60대'],
    datasets: [
      {
        label: '연령대별 비율',
        data: [
          data.PPLTN_RATE_10,
          data.PPLTN_RATE_20,
          data.PPLTN_RATE_30,
          data.PPLTN_RATE_40,
          data.PPLTN_RATE_50,
          data.PPLTN_RATE_60,
        ],
        backgroundColor: [
          '#FF6384', // 10대
          '#FF9F40', // 20대
          '#FFCD56', // 30대
          '#4BC0C0', // 40대
          '#36A2EB', // 50대
          '#9966FF', // 60대
        ],
        hoverOffset: 4,
        borderWidth: 1,
      },
    ],
  };

  // 도넛 차트 옵션 설정
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%', // 도넛 차트의 중앙 비율 설정
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          padding: 20, // 범례의 각 항목과 간격 설정
        },
      },
      tooltip: {
        enabled: true,
        bodyFont: {
          size: 19, // 툴팁 텍스트 크기 설정
        },
      },
    },
    layout: {
      padding: {
        right: 20, // 도넛 차트와 범례 사이의 간격 조절
      },
    },
  };

  return (
    <div style={{ height: '480px', width: '480px', margin: '0 auto' }}>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
}

export default DonutChart;

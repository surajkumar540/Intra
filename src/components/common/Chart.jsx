import React, { useEffect, useRef } from 'react';
import * as Chart from 'chart.js';

// Register Chart.js components
Chart.Chart.register(
  Chart.ArcElement,
  Chart.Tooltip,
  Chart.Legend,
  Chart.DoughnutController
);

const ChartComponent = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Sample dashboard data - replace with your actual data
  const dashboardData = {
    attendancePercentage: 22
  };

  // Chart.js data configuration
  const data = {
    labels: [
      'Present',
      'Absent',
      'Late'
    ],
    datasets: [{
      label: 'Attendance Data',
      data: [dashboardData.attendancePercentage, 15, 10],
      backgroundColor: [
        '#8ACC7D',
        '#ff6384',
        '#ffce56'
      ],
      borderColor: [
        '#8ACC7D',
        '#ff6384',
        '#ffce56'
      ],
      borderWidth: 2,
      hoverOffset: 4
    }]
  };

  // Chart.js configuration
  const config = {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            font: {
              size: 12
            }
          }
        }
      },
      cutout: '70%'
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new chart
      chartInstance.current = new Chart.Chart(chartRef.current, config);
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center mb-4">
      <div className="relative w-64 h-64">
        <canvas ref={chartRef} className="w-full h-full"></canvas>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
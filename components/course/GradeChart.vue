<template>
    <div class="chart-container">
      <Bar v-if="chartData && chartOptions" :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  const chartData = ref(null)
  const chartOptions = ref(null)
  
  onMounted(() => {
    chartData.value = {
      labels: [
        'F', 'D', 'D+', 'C', 'C+', 'B', 'B+', 'A'
      ],
      datasets: [
        {
          label: 'Scores',
          backgroundColor: '#FEC232', 
          borderRadius: 5, 
          data: [12, 19, 3, 5, 2, 3, 7, 10]
        }
      ]
    }
  
    chartOptions.value = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Grades'
          },
          grid: {
            display: false 
          },
        },
        y: {
          title: {
            display: true,
            text: 'No. of Students'
          },
          grid: {
            display: false 
          },
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  })
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%;
    height: 300px;
    margin: 0 auto;
  }
  </style>
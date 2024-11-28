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
      '0-5', '5-10', '10-15', '15-20', '20-25', '25-30', '30-35', '35-40', '40-45', '45-50',
      '50-55', '55-60', '60-65', '65-70', '70-75', '75-80', '80-85', '85-90', '90-95', '95-100'
    ],
    datasets: [
      {
        label: 'Scores',
        backgroundColor: '#FEC232', 
        borderRadius: 5, 
        data: [12, 19, 3, 5, 2, 3, 7, 10, 15, 12, 5, 30, 35, 20, 45, 30, 55, 40, 25, 3]
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
          text: 'Score Range'
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
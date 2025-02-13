<template>
  <div class="chart-container">
    <Bar
      v-if="chartData && chartOptions"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const chartData = ref(null);
const chartOptions = ref(null);

onMounted(() => {
  chartData.value = {
    score: [
      {
        score: "0-50",
        frequency: 2,
      },
      {
        score: "51-55",
        frequency: 0,
      },
      {
        score: "56-60",
        frequency: 0,
      },
      {
        score: "61-65",
        frequency: 0,
      },
      {
        score: "66-70",
        frequency: 1,
      },
      {
        score: "71-75",
        frequency: 0,
      },
      {
        score: "76-80",
        frequency: 1,
      },
      {
        score: "81-85",
        frequency: 0,
      },
      {
        score: "86-90",
        frequency: 0,
      },
      {
        score: "91-95",
        frequency: 1,
      },
      {
        score: "96-100",
        frequency: 0,
      },
    ],
    labels: [
      "0-50",
      "50-55",
      "55-60",
      "60-65",
      "65-70",
      "70-75",
      "75-80",
      "80-85",
      "85-90",
      "90-95",
      "95-100",
    ],
    datasets: [
      {
        label: "Scores",
        backgroundColor: "#FEC232",
        borderRadius: 5,
        data: [2, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
      },
    ],
  };

  chartOptions.value = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Score Range",
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "No. of Students",
        },
        grid: {
          display: false,
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 300px;
  margin: 0 auto;
}
</style>

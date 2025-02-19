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

const props = defineProps({
  grade_frequencies: {
    type: Array,
    required: true,
  },
});

const chartData = ref(null);
const chartOptions = ref(null);

onMounted(() => {
  chartData.value = {
    labels: props.grade_frequencies.map((score) => score.name),
    datasets: [
      {
        label: "Scores",
        backgroundColor: "#FEC232",
        borderRadius: 5,
        data: props.grade_frequencies.map((score) => score.frequency),
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
          text: "Grades",
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

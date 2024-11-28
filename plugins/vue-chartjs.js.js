import { Chart, registerables } from 'chart.js'
import { defineNuxtPlugin } from '#app'

Chart.register(...registerables)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('chart', Chart)
})
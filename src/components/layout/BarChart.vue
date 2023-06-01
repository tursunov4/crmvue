<template>
    <div class="chart">
        <Bar :data="chartData.data" :options="chartData.options" :css-classes="cssClasses" :styles="styles" :width="800"
            :height="400" />
    </div>
</template>
  
<script setup>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { computed } from 'vue'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
const props = defineProps({
    income_total: {
        type: Array
    },
    expense_total: {
        type: Array
    }
})

const chartData = computed(() => {
    return {
        data: {
            labels: ['January', 'Febraury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: "Monthly incomes",
                    data: props.income_total,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    backgroundColor: [
                        'rgba(67, 94, 190, 0.7)',
                        'rgba(87, 202, 235, 0.5)'
                    ]
                },
                {
                    label: "Monthly expenses",
                    data: props.expense_total,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    backgroundColor: [
                        'rgba(87, 202, 235, 0.5)',
                        'rgba(67, 94, 190, 0.7)'
                    ]
                },
            ]
        },
        options: {
            responsive: true
        }
    }
})

</script>
<template>
  <q-page padding>
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="'bar-chart'"
      :dataset-id-key="'label'"
      :plugins="[]"
      :css-classes="''"
      :styles="{}"
      :width="400"
      :height="400"
      :title="'Cuentas'"
    />
    <div class="q-my-md">
      <q-separator/>
    </div>
    <Doughnut
      :chart-options="chartOptionsDoughnut"
      :chart-data="chartDataDoughnut"
      :chart-id="'doughnut-chart'"
      :dataset-id-key="'label'"
      :plugins="[]"
      :css-classes="''"
      :styles="{}"
      :width="400"
      :height="400"
      :title="'In/Out'"
    />
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Bar, Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import { getStorageData, getAccounts } from 'src/composables/useStorage';
import { categories } from 'src/utils/DefaultConfigs';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

const data = ref(getStorageData());


const datatograph = ref<number[]>(getAccounts()); 
const countexpenses = ref(0);
const countincomes = ref(0);

function countexpensesandincomes (){
  data.value?.forEach((item)=>{
    if(item.type === 'expense'){
      countexpenses.value = countexpenses.value + parseFloat(item.amount.toString());
    }else{
      countincomes.value = countincomes.value + parseFloat(item.amount.toString());
    }
  })
}
countexpensesandincomes()

const chartData = {
  labels: categories,
  datasets: [ 
    {
      label: 'Gastos',
      data: datatograph.value,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ], 
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }
  ]
}

const chartDataDoughnut = {
  labels: ['Gastos', 'Ingresos'],
  datasets: [ 
    {
      label: 'Gastos/Ingresos',
      data: [countexpenses.value, countincomes.value],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
      ],
      hoverOffset: 4
    }
  ]
}

const chartOptions = { 
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Grafico de Barra para Cuentas'
    }
  }
}

const chartOptionsDoughnut = { 
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Gastos-Ingresos'
    }
  }
}

</script>
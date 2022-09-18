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
      :title="'Categorias'"
    />
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { getStorageData } from 'src/composables/useStorage';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const data = ref(getStorageData());
const categories = ref(['Alimentacion', 'Pasaje', 'Estudio', 'Diversion', 'Otro']);

const datatograph = ref<number[]>([]); 
function formatdata(){
  if(data.value){
    categories.value.forEach((category)=>{
      let sum = 0;
      data.value?.forEach((item) =>{
        if(item.type === 'expense' && item.category === category){
          sum = sum + parseFloat(item.amount.toString());
        }
      })
      datatograph.value.push(sum)
    })    
  }
}
formatdata();

const chartData = {
  labels: categories.value,
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

const chartOptions = { 
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Estadistica por Categorias'
    }
  }
}

</script>
<template>
  <q-page padding>
    <div class="row justify-center">
      <q-card class="q-mb-md bg-light-blue-4" style="width: 60%;">
        <q-card-section style="text-align: center;">
          Monto Actual: {{ TotalMoney() }}
        </q-card-section>
      </q-card>
    </div>
    <q-card class="q-mb-sm" :class="[ transaction.type == 'expense' ? 'expense':'income', ]" style="width: 100%" v-for="transaction in transactions" :key="transaction.id">
      <q-card-section>
        S/.{{ transaction.amount }} - {{ transaction.category }} - {{ transaction.description }}
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { getStorageData } from 'src/composables/useStorage';


  const transactions = ref(getStorageData());

  const TotalMoney = ():number => {
    if(transactions.value){
      let count = 0;
      transactions.value.forEach((element) => {
        if(element.type == 'expense'){
          count = count - parseInt(element.amount.toString()); 
        }else{
          count = count + parseInt(element.amount.toString()); 
        }
      })
      return count;
    }
    return 0;
  }


</script>
<style scoped>

  .income{
    border: 1px solid green;
  }

  .expense{
    border: 1px solid red;
  }
</style>
<template>
  <q-page padding>
    <div class="row justify-center">
      <q-card class="q-mb-md bg-light-blue-4" style="width: 80%;">
        <q-card-section style="text-align: center;">
          <p class="text-weight-bold">Saldo Actual: S/.{{ Currenttotal.toFixed(2) }}</p>
          <p class="text-weight-bold">Monto de Egreso : S/.{{ totalExpense.toFixed(2) }}</p>
          <p class="text-weight-bold">Entradas Totales : S/.{{ totalIncomes.toFixed(2) }}</p>

        </q-card-section>
      </q-card>
    </div>
    <q-card class="q-mb-sm" :class="[ transaction.type == 'expense' ? 'expense':'income', ]" style="width: 100%" v-for="transaction in transactions" :key="transaction.id">
      <q-card-section class="row justify-between">
        <div>
          S/.{{ transaction.amount }} - {{ transaction.category }} - {{ transaction?.description.length > 28 ? transaction?.description.substring(0,25)+ '...': transaction?.description }}
        </div>
        <div>
          <!-- <q-btn dense round flat color="grey" @click="deleteRow(transaction)" icon="edit" aria-label="eliminar">
          </q-btn> -->
          <q-btn dense round flat color="grey" @click="deleteRow(transaction)" icon="delete" aria-label="eliminar">
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { useQuasar } from 'quasar';
  import { transactionformat, getStorageData, removeRecord } from 'src/composables/useStorage';

  const $q = useQuasar();
  const transactions = ref(getStorageData());

  const totalExpense = ref(0);
  const totalIncomes = ref(0);
  const Currenttotal = ref(0);

  const TotalMoney = ():void => {
    let count = 0;
    if(transactions.value){
      transactions.value.forEach((element) => {
        if(element.type == 'expense'){
          count = count - parseFloat(element.amount.toString()); 
          totalExpense.value = totalExpense.value + parseFloat(element.amount.toString());
        }else{
          count = count + parseFloat(element.amount.toString()); 
          totalIncomes.value = totalIncomes.value + parseFloat(element.amount.toString());
        }
      })
    }
    Currenttotal.value = count;
  }
  TotalMoney();

  const deleteRow = (transaction: transactionformat)=>{
    $q.dialog({
				title: 'Eliminar',
				message: '¿Deseas eliminar esta transacción?',
				ok: {
					color: 'primary',
					label: 'Si, eliminar!'
				},
				cancel: {
					flat: true,
					label: 'Cancelar'
				},
				persistent: false
			}).onOk(() => {
        let index = 0;
        if(transactions.value){
          for(let i = 0; i <transactions.value?.length; i++){
            if(transactions.value[i].id == transaction.id){
              index = i;
              break;
            }
          }
          removeRecord(index);
          transactions.value = getStorageData();
          TotalMoney();
        }
			})
  }


</script>
<style scoped>

  .income{
    border: 1px solid #77C66E;
  }

  .expense{
    border: 1px solid rgb(255, 99, 132);
  }
</style>
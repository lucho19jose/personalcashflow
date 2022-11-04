<template>
  <q-form @submit="saveForm">
    <div class="text-h6" style="text-align:center;">Añadir nuevo {{ props.name }}</div>
    <div class="q-mb-sm">
      <q-input outlined type="number" step=".01" v-model="amount" label="Monto" 
        :rules="[val => val.length > 0 && val !=0 || 'Ingrese el monto']" ref="amountref" @click="selectinput" lazy-rules/>
    </div>
    <div v-if="props.category" class="q-mb-sm">
      <q-select ref="categoryref" outlined v-model="categoryselected" :options="categoriesnew" label="Categoria" 
        :rules="[val => val.length > 0 || 'Seleccione la categoria']" lazy-rules/>
    </div>
    <div class="q-mb-sm">
      <q-input ref="descriptionref" outlined v-model="description" label="Descripcion"/>
    </div>
    <div v-if="name == 'Ingreso'">
      <SettingsAccounts :total="parseInt(amount.toString())" @accountsPercentajes="getpercentajes" @specificAccount="getSpecificAccount" v-model:toggle-value="isSpecificAccount"></SettingsAccounts>
    </div>
    <div class=" row justify-center">
      <q-btn color="primary" :label="`Añadir ${ props.name }`" type="submit"/>
    </div>
  </q-form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar'
import { getStorageData, saveNewRecord, settoaccounts, settospecificaccount } from 'src/composables/useStorage';
import SettingsAccounts from 'components/SettingsAccounts.vue';
import confetti from 'canvas-confetti';

//const confetti = require('canvas-confetti');

  const $q = useQuasar();
  const amount = ref<number>(0);
  const description = ref<string>('');
  const categoriesnew = ref<string[]>(['Necesidades Básicas', 'Libertad Financiera', 'Cuenta para Formación', 'Cuenta para Ahorros a Largo Plazo', 'Cuenta para Donativos', 'Cuenta para Divertirse']);
  //const categories = ref<string[]>(['Alimentacion', 'Pasaje', 'Estudio', 'Diversion', 'Otro']);
  const categoryselected = ref<string>('');
  

  const percentajesValues = ref([50, 10, 10, 10, 10, 10])

  interface refs {
    resetValidation: ()=> void,
    select: ()=> void
  }

  const amountref= ref<null| refs>(null);

  const categoryref = ref<null | refs>(null);
  const descriptionref = ref<null| refs>(null);

  const props = defineProps({
    name: { type: String, required: true },
    category: { type: Boolean, default: true },
  })

  interface newtransaction {
    id: number,
    amount: number;
    category?: string;
    description: string;
    date: string | Date,
    type: 'expense' | 'income',
  }

  const saveForm = () => {
    try {
      let date = new Date();
      const newOnetransaction: newtransaction = {
        id: generateoneID(),
        amount: amount.value,
        category: categoryselected.value,
        description: description.value,
        date: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+ date.getDate() + ' ' + date.getHours()+':'+date.getMinutes()+':'+ date.getSeconds(),
        type: props.name == 'Gasto' ? 'expense' : 'income'
      }
      
      const status = saveNewRecord(newOnetransaction);
      console.log('status', status);
      
      if(props.name != 'Gasto'){
        let saveaccounts = 0;
        if(!isSpecificAccount.value){
          saveaccounts = settoaccounts(percentajesValues.value, parseFloat(amount.value.toString()))
        }else if(specificAccountvalue.value){
          saveaccounts = settospecificaccount(specificAccountvalue.value?.value, parseFloat(amount.value.toString()))
        }

        console.log('responsesaveaccounts', saveaccounts);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      

      if(status === 200){
        $q.notify({
          type: 'positive',
          message: 'Registro añadido correctamente !',
          timeout: 500,
        })
        amount.value = 0;
        categoryselected.value = '';
        description.value? description.value = '': '';
        amountref.value?.resetValidation();
        console.log('categoryref', categoryref.value);
        if(categoryref.value){
          categoryref.value?.resetValidation();
        }
        descriptionref.value?.resetValidation();
      }else{
        $q.notify({
          type: 'negative',
          message: 'A ocurrido un error :( ! 500',
          timeout: 500,
        })
      }
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: 'A ocurrido un error :( !',
        timeout: 500,
      })
    }
  }
  
  const generateoneID = (): number => {
    let transactions: newtransaction[] | null = getStorageData()
    if(transactions){
      let id: number = transactions.length;
      while(true){
        if(transactions.filter(el => el.id == id).length < 1){
          break;
        }
        id++;
      }
      return id;
    }
    return 0;
  }

  const selectinput = () => {
    amountref.value?.select();
  }

  const getpercentajes = (ev: number[]) => {
    console.log(ev);
    if(ev){
      percentajesValues.value[0] = ev[0];
      percentajesValues.value[1] = ev[1];
      percentajesValues.value[2] = ev[2];
      percentajesValues.value[3] = ev[3];
      percentajesValues.value[4] = ev[4];
      percentajesValues.value[5] = ev[5];
    }
  }
  interface selectCategories {
    label: string,
    value:  number
  }
  const isSpecificAccount = ref(false);
  const specificAccountvalue = ref<selectCategories | null>(null)

  const getSpecificAccount = (ev: selectCategories) => {
    if(ev){
      isSpecificAccount.value = true;
      //console.log('specificAccount', ev);
      specificAccountvalue.value = ev;
    }
  }


  /* const editForm */ 
</script>
<style scoped>
  .btn-add {
   width: 100%;
  }
</style>
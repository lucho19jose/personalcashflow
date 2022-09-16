<template>
  <q-form @submit="saveForm">
    <div class="text-h6" style="text-align:center;">Añadir nuevo {{ props.name }}</div>
    <div class="q-mb-sm">
      <q-input outlined type="number" v-model="amount" label="Monto" 
        :rules="[val => val.length > 0 && val !=0 || 'Ingrese el monto']" ref="amountref" @click="selectinput" lazy-rules/>
    </div>
    <div v-if="props.category" class="q-mb-sm">
      <q-select outlined v-model="categoryselected" :options="categories" label="Categoria" 
        :rules="[val => val.length > 0 || 'Seleccione la categoria']" lazy-rules/>
    </div>
    <div class="q-mb-sm">
      <q-input outlined v-model="description" label="Descripcion" />
    </div>
    <div class=" row justify-center">
      <q-btn color="primary" :label="`Añadir ${ props.name }`" type="submit"/>
    </div>
  </q-form>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { useQuasar } from 'quasar'

  const $q = useQuasar()
  const amount = ref<number>(0);
  const description = ref<string>('');
  const categories = ref<string[]>(['Alimentacion', 'Pasaje', 'Estudio', 'Diversion', 'Otro']);
  const categoryselected = ref<string>('');

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
  
      if($q.localStorage.getItem('transactions')){
        let transactions: newtransaction[] | null = $q.localStorage.getItem('transactions');
        transactions?.push(newOnetransaction)
        console.log('transactions', transactions);
        $q.localStorage.set('transactions', transactions);
      }else{
        let transactions = []
        transactions.push(newOnetransaction)
        
        $q.localStorage.set('transactions', transactions);
      }
      $q.notify({
        type: 'positive',
        message: 'Registro añadido correctamente !',
        timeout: 500,
      })
    } catch (error) {

    }
  }


  const generateoneID = (): number => {
    let transactions: newtransaction[] | null = $q.localStorage.getItem('transactions');
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const amountref:any= ref(null)
  const selectinput = () => {
    amountref.value?.select();
  }

  /* const editForm */ 
</script>
<style scoped>
  .btn-add {
   width: 100%;
  }
</style>
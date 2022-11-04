<script setup lang="ts">
import { emit } from 'process';
import { ref } from 'vue'

interface Props {
  total: number,
  toggleValue: boolean
}

interface selectCategories {
  label: string,
  value:  number
}

const props = withDefaults(defineProps<Props>(),{
  total: 0
})

const account1 = ref(50);
const account2 = ref(10);
const account3 = ref(10);
const account4 = ref(10);
const account5 = ref(10);
const account6 = ref(10);

const expanded = ref(false)
const toggle = ref(false);

const emit = defineEmits(['accountsPercentajes', 'specificAccount', 'update:toggleValue'])

const sendEmitvalues = ()=>{
  if(!toggle.value){
    emit('accountsPercentajes', [parseInt(account1.value.toString()), parseInt(account2.value.toString()), parseInt(account3.value.toString()), parseInt(account4.value.toString()), parseInt(account5.value.toString()), parseInt(account6.value.toString())])  
  }
}

const categoriesnew = ref<selectCategories[]>([
  { label: 'Necesidades Básicas', value: 0},
  { label: 'Libertad Financiera', value: 1},
  { label: 'Cuenta para Formación', value: 2}, 
  { label: 'Cuenta para Ahorros a Largo Plazo', value: 3}, 
  { label: 'Cuenta para Donativos', value: 4}, 
  { label: 'Cuenta para Divertirse', value: 5}]);

const categoryselected = ref<selectCategories | null>(null);

</script>

<template>
  <q-btn
        color="grey"
        round
        flat
        dense
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
        label="Configurar porcentaje de cuentas"
      />
  <q-slide-transition>
    <div v-if="expanded">
      <q-separator />
      <q-card-section class="text-subitle2">
        <div>
          <q-toggle v-model="toggle" label="Añadir a una cuenta especifica" @update:model-value="$emit('update:toggleValue', toggle)"/>
          <div v-show="!toggle">
            <div class="q-mb-sm">
              <q-input ref="account11" type="number" suffix="%" outlined v-model="account1" @update:model-value="sendEmitvalues" label="Cuenta de Necesidades Básicas" :hint="(account1*props.total/100).toString()"/>
            </div>
            <div class="q-mb-sm">
              <q-input ref="account21" type="number" suffix="%" outlined v-model="account2" @update:model-value="sendEmitvalues" label="Cuenta de Libertad Financiera" :hint="(account2*props.total/100).toString()"/>
            </div>
            <div class="q-mb-sm">
              <q-input ref="account31" type="number" suffix="%" outlined v-model="account3" @update:model-value="sendEmitvalues" label="Cuenta para Formación" :hint="(account3*props.total/100).toString()"/>
            </div>
            <div class="q-mb-sm">
              <q-input ref="account41" type="number" suffix="%" outlined v-model="account4" @update:model-value="sendEmitvalues" label="Cuenta para Ahorros a Largo Plazo" :hint="(account4*props.total/100).toString()"/>
            </div>
            <div class="q-mb-sm">
              <q-input ref="account51" type="number" suffix="%" outlined v-model="account5" @update:model-value="sendEmitvalues" label="Cuenta para Donativos" :hint="(account5*props.total/100).toString()"/>
            </div>
            <div class="q-mb-sm">
              <q-input ref="account61" type="number" suffix="%" outlined v-model="account6" @update:model-value="sendEmitvalues" label="Cuenta para Divertirse" :hint="(account6*props.total/100).toString()"/>
            </div>
          </div>
          <div v-show="toggle">
            <q-select ref="categoryref" outlined v-model="categoryselected" :options="categoriesnew" label="Categoria" 
              :rules="[val => val || !toggle || 'Seleccione la categoria']" lazy-rules @update:model-value="$emit('specificAccount', categoryselected)"/>
          </div>
        </div>
      </q-card-section>
    </div>
  </q-slide-transition>
  
</template>

<style scoped>

</style>
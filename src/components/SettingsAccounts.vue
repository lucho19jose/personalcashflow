<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  total: number
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
          <div class="q-mb-sm">
            <q-input ref="account11" outlined v-model="account1" label="Cuenta de Necesidades Básicas" :hint="(account1*props.total/100).toString()"/>
          </div>
          <div class="q-mb-sm">
            <q-input ref="account21" outlined v-model="account2" label="Cuenta de Libertad Financiera" :hint="(account2*props.total/100).toString()"/>
          </div>
          <div class="q-mb-sm">
            <q-input ref="account31" outlined v-model="account3" label="Cuenta para Formación" :hint="(account3*props.total/100).toString()"/>
          </div>
          <div class="q-mb-sm">
            <q-input ref="account41" outlined v-model="account4" label="Cuenta para Ahorros a Largo Plazo" :hint="(account4*props.total/100).toString()"/>
          </div>
          <div class="q-mb-sm">
            <q-input ref="account51" outlined v-model="account5" label="Cuenta para Donativos" :hint="(account5*props.total/100).toString()"/>
          </div>
          <div class="q-mb-sm">
            <q-input ref="account61" outlined v-model="account6" label="Cuenta para Divertirse" :hint="(account6*props.total/100).toString()"/>
          </div>
        </div>
      </q-card-section>
    </div>
  </q-slide-transition>
  
</template>

<style scoped>

</style>
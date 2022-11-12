<script setup lang="ts">
import { ref } from 'vue';
import { LocalStorage } from 'quasar'

interface AppConfigs {
  showquotes: boolean 
}

const GeneralConfigs = ref<AppConfigs>(DefaultConfigs());

if(LocalStorage.getItem('AppConfigs')){
  const dataconfig: AppConfigs | null = LocalStorage.getItem('AppConfigs');
  if(dataconfig){
    GeneralConfigs.value = dataconfig
  }
}

function switchtoggle(){
  console.log('swich toggle', GeneralConfigs.value.showquotes);
  
  GeneralConfigs.value.showquotes = GeneralConfigs.value.showquotes ? true : false;
  LocalStorage.set('AppConfigs', GeneralConfigs.value);
}

function DefaultConfigs(): AppConfigs{
  return {
    showquotes: false
  };
}

</script>
<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <h6 class="q-ma-none">Configuraciones</h6>
        <div>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Mostrar los arhivos de riqueza</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-toggle color="green" v-model="GeneralConfigs.showquotes" @update:model-value="switchtoggle" />
            </q-item-section>
          </q-item>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
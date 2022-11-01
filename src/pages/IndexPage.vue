<template>
  <q-page padding class="row justify-evenly">
    <div style="width: 100%;">
      <q-card style="width: 100%">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="expenses" label="Gasto" />
          <q-tab name="income" label="Ingreso" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="expenses">
            <!-- Un gasto o egreso es el consumo de un bien o servicio a cambio de una contraprestación, que suele hacerse efectiva mediante un pago monetario. -->
            <AppForm
              :name="'Gasto'"
            ></AppForm>
          </q-tab-panel>

          <q-tab-panel name="income">
            <AppForm
              :name="'Ingreso'"
              :category="false"
            ></AppForm>
          </q-tab-panel>

        </q-tab-panels>
      </q-card>
      <q-card class="q-mt-md">
        <q-card-section>
          <PhrasesComponent></PhrasesComponent>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppForm from 'src/components/AppForm.vue';
import PhrasesComponent from 'src/components/PhrasesComponent.vue';
  
  const tab = ref<string>('expenses'); 


</script>

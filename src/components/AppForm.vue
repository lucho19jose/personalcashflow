<template>
  <div>
    <div class="text-h6" style="text-align:center;">Añadir nuevo {{ props.name }}</div>
    <div class="q-mb-sm">
      <q-input outlined type="number" v-model="amount" label="Monto" />
    </div>
    <div v-if="props.category" class="q-mb-sm">
      <q-select outlined v-model="categoryselected" :options="categories" label="Categoria" />
    </div>
    <div class="q-mb-sm">
      <q-input outlined v-model="description" label="Descripcion" />
    </div>
    <div class=" row justify-center">
      <q-btn color="primary" :label="`Añadir ${ props.name }`" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  const amount = ref<number>(0);
  const description = ref<string>('');
  const categories = ref<string[]>(['Alimentacion', 'Pasaje', 'Estudio', 'Diversion', 'Otro']);
  const categoryselected = ref<string>('');

  const props = defineProps({
    name: { type: String, required: true },
    category: { type: Boolean, default: true },

  })
</script>
<style scoped>
  .btn-add {
   width: 100%;
  }
</style>
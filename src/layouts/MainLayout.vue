<template>
  <div class="row justify-center">
    <Suspense>
      <template #default>
        <Home></Home>
      </template>
      <template #fallback>
        <SplashScreenVue></SplashScreenVue>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import SplashScreenVue from 'src/components/SplashScreen.vue';

const Home = defineAsyncComponent(async ()=>import('src/pages/HomeApp.vue')
    /* await new Promise((resolve) => {
      setTimeout(()=>{
        resolve(import('src/pages/HomeApp.vue'));
      }, 100);
    }) */
);
</script>

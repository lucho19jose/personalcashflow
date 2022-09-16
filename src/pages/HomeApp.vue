<template>
  <q-layout view="lHh Lpr lFf">
      <q-header elevated>
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />
  
          <q-toolbar-title>
            wastecontrol
          </q-toolbar-title>
  
          <div>Quasar v{{ $q.version }}</div>
        </q-toolbar>
      </q-header>
  
      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
      >
        <q-list>
          <q-item-label
            header
          >
          </q-item-label>
        </q-list>
        <q-list>
          <q-expansion-item v-model="models[0].value" :content-inset-level="0.5" expand-separator>
            <template v-slot:header>
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon name="home" size="25px" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>Inicio</q-item-section>
            </template>
              <q-item clickable active-class="text-primary" :to="{ name: 'index' }">
                <q-item-section avatar>
                  <q-icon name="home" size="25px"/>
                </q-item-section>
                <q-item-section>Inicio</q-item-section>
              </q-item>
          </q-expansion-item>
          
          <q-expansion-item v-model="models[1].value" :content-inset-level="0.5" expand-separator>
            <template v-slot:header>
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon name="library_books" size="25px" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>Movimientos</q-item-section>
            </template>
              <q-item clickable active-class="text-primary" :to="{ name: 'movements' }">
                <q-item-section avatar>
                  <q-icon name="library_books" size="25px"/>
                </q-item-section>
                <q-item-section>Movimientos</q-item-section>
              </q-item>
          </q-expansion-item>

          <q-expansion-item v-model="models[2].value" :content-inset-level="0.5" expand-separator>
            <template v-slot:header>
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon name="analytics" size="25px" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>Estadisticas</q-item-section>
            </template>
              <q-item clickable active-class="text-primary" :to="{ name: 'statistics' }">
                <q-item-section avatar>
                  <q-icon name="fas fa-chart-bar" size="25px"/>
                </q-item-section>
                <q-item-section>Estadisticas</q-item-section>
              </q-item>
          </q-expansion-item>
          <!-- config item to put categories -->
          <q-expansion-item v-model="models[3].value" :content-inset-level="0.5" expand-separator>
            <template v-slot:header>
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon name="fas fa-tools" size="25px" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>Configuración</q-item-section>
            </template>
              <q-item clickable active-class="text-primary" :to="{ name: 'configs' }">
                <q-item-section avatar>
                  <q-icon name="newspaper" size="25px"/>
                </q-item-section>
                <q-item-section>Configuración</q-item-section>
              </q-item>
          </q-expansion-item>
        </q-list>
      </q-drawer>
  
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  
  const leftDrawerOpen = ref(false)

  /* interface lateralbar {
    
  } */


  const models = ref([
    {
      value: true
    },
    {
      value: false
    },
    {
      value: false
    },
    {
      value: false
    },
  ])
  
  function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }

  watch(models, ()=>{
    console.log('hello');
  });

  </script>
  
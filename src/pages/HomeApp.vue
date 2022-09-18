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
          <q-expansion-item v-model="section.model" v-for="section in lateralbar" :key="section.name" :content-inset-level="0.5" expand-separator>
            <template v-slot:header>
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon :name="section.icon" size="25px" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>{{ section.name }}</q-item-section>
            </template>
              <q-item clickable active-class="text-primary" v-for="item in section.items" :key="item.name" :to="{ name: item.to }">
                <q-item-section avatar>
                  <q-icon :name="item.icon" size="25px"/>
                </q-item-section>
                <q-item-section>{{ item.name }}</q-item-section>
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
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter()
  const leftDrawerOpen = ref(false)

  /* interface lateralbar {
    
  } */


  const lateralbar = ref([
    {
      name: 'Inicio',
      model: false,
      icon: 'home',
      validate: [],
      items: [
        {
          to: 'startIndex',
          icon: 'home',
          name: 'Inicio'
        },
      ]
    },
    {
      name: 'Movimientos',
      model: false,
      icon: 'library_books',
      validate: [],
      items: [
        {
          to: 'movements',
          icon: 'library_books',
          name: 'Movimientos'
        },
      ]
    },
    {
      name: 'Estadisticas',
      model: false,
      icon: 'analytics',
      validate: [],
      items: [
        {
          to: 'statistics',
          icon: 'fas fa-chart-bar',
          name: 'Estadisticas'
        },
      ]
    },
    {
      name: 'Configuración',
      model: false,
      icon: 'fas fa-tools',
      validate: [],
      items: [
        {
          to: 'configs',
          icon: 'newspaper',
          name: 'Configuración'
        },
      ]
    }
  ])
  
  function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }

  const currentr = ref<string | symbol | undefined| null>('');
  const sectionSelected  = ref<string | symbol | undefined| null>('');
  function activeCurretRoute() {
    currentr.value = router.currentRoute.value.name;
    for(let i = 0; i<lateralbar.value.length; i++){
      if(lateralbar.value[i].items.find(item => item.to == currentr.value)){
        lateralbar.value[i].model = true;
        sectionSelected.value = lateralbar.value[i].name;
        break;
      }
    }
  }
  activeCurretRoute();


  </script>
  
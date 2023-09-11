<script setup lang="ts">
import WeatherPage from './components/weather.vue'
import { storeToRefs } from 'pinia';
import { useWeatherStore } from './stores/weatherStore'
import { ref, watch } from 'vue';

const weatherStore = useWeatherStore();
const { city, cityList, cityPicked, isWeatherDetails } = storeToRefs(weatherStore);

const cityInput = ref(null);

watch(city, async () => {
  if (city.value.length > 3) {
    await weatherStore.getCities();
  }
})
</script>

<template>
  <main class="vh-100 vw-100 bg-dark text-light overflow-x-hidden hideScrollbar">
    <nav class="navbar navbar-expand py-3">
      <div class="container-fluid justify-content-between align-items-center">
        <a href="#" class="navbar-brand d-flex align-items-end">
          <img src="/logo-white.png" alt="logo" class="img-fluid" width="50">
          <span class="ms-2 h1 text-light fw-medium mb-0">firocther</span>
        </a>
        <div class="input-group me-3 me-md-0">
          <label class="d-flex align-items-center px-4 py-2 bg-gray-100 rounded-pill mx-md-auto mx-0 ms-auto position-relative">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="fs-5"/>
            <input ref="cityInput" type="text" class="d-none d-md-inline-block form-control bg-transparent border-0 shadow-none text-light" placeholder="Search city..." v-model="city">
            <div v-if="cityList.length" class="border-top border-secondary position-absolute start-0 top-100 z-1 bg-gray-100">
              <label v-for="city in cityList" :key="city.latlon" class="d-flex align-items-center" @click="weatherStore.getCityPicked(city.latlon)">
                <input type="radio" :value="city.latlon" v-model="cityPicked" class="d-none">
                <font-awesome-icon :icon="['fas', 'location-dot']" class="fs-4 me-2" />
                <div class="p-1">
                  <p class="mb-0">{{ city.name }}</p>
                  <p class="small text-secondary mb-0">{{ city.country }}</p>
                </div>
              </label>
            </div>
          </label>
        </div>
        <div>
          <button class="btn btn-info rounded-pill text-nowrap px-4 py-2 d-flex align-items-center" @click="weatherStore.getCities">
            <font-awesome-icon :icon="['fas', 'location-crosshairs']" />
            <span class="d-none d-md-inline-block ms-2">Current Location</span>
          </button>
        </div>
      </div>
    </nav>
    <section v-if="isWeatherDetails" class="content py-5">
      <Suspense>
          <WeatherPage />
          <template #fallback>
            Loading...
          </template>
      </Suspense>
    </section>
  </main>
</template>

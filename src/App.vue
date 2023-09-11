<script setup lang="ts">
import WeatherPage from './components/weather.vue'
import { storeToRefs } from 'pinia';
import { useWeatherStore } from './stores/weatherStore'
import { watch } from 'vue'
import { type DayNight, Condition } from './types/weatherTypes'

const weatherStore = useWeatherStore();
const { city, cityList, cityPicked, cityNamePicked, isCityPicked, isWeatherDetails, isDay, conditionWeather, recentCities } = storeToRefs(weatherStore);

watch(city, async () => {
  isCityPicked.value = false;
  if (city.value.length > 3) {
    await weatherStore.getCities();
  }
})

function getImageUrl(daynight : DayNight | undefined, condition : Condition | undefined) {
  return new URL(`./assets/images/${daynight}/${condition}.jpg`, import.meta.url).href;
}

</script>

<template>
  <main 
  class="vh-100 vw-100 text-light overflow-x-hidden hideScrollbar" 
  :style="cityNamePicked ? `background: url(${getImageUrl(isDay, conditionWeather)}) center center / cover !important` : 'background-color: #131216'"
  >
    <nav class="navbar navbar-expand py-3">
      <div class="container-fluid justify-content-between align-items-center">
        <a href="#" class="navbar-brand d-flex align-items-center">
          <img src="/logo-white.png" alt="logo" class="img-fluid" width="50">
          <span class="ms-2 display-4 text-light fw-medium mb-0">firocther</span>
        </a>
        <div class="input-group me-3 me-md-0">
          <label class="d-flex align-items-center px-4 py-2 bg-gray-100 rounded-pill mx-md-auto mx-0 ms-auto position-relative">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="d-none d-md-block fs-5"/>
            <button class="d-block d-md-none border-0 shadow-none bg-transparent text-light" data-bs-toggle="modal" data-bs-target="#searchModal">
              <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="fs-5"/>
            </button>
            <input type="text" class="d-none d-md-inline-block form-control bg-transparent border-0 shadow-none text-light" placeholder="Search city..." v-model="city" @keydown="weatherStore.searchCity($event)">
            <span v-if="isCityPicked" class="ps-2 ms-1 text-nowrap d-none d-md-block">{{ cityNamePicked }}</span>
            <div v-else>
              <div v-if="cityList.length" class="border-top border-secondary position-absolute start-0 top-100 z-1 bg-gray-100 py-2">
                <label v-for="city in cityList" :key="city.latlon" class="d-flex align-items-center ps-4 citypicked">
                  <input type="radio" :value="city.latlon" v-model="cityPicked" class="d-none" @click="weatherStore.getCityPicked(city.latlon, city.name)">
                  <font-awesome-icon :icon="['fas', 'location-dot']" class="fs-4 me-2" />
                  <div class="p-1">
                    <p class="mb-0">{{ city.name }}</p>
                    <p class="small text-secondary mb-0">{{ city.country }}</p>
                  </div>
                </label>
              </div>
            </div>
          </label>
        </div>
        <div>
          <button class="btn btn-info rounded-pill text-nowrap text-light px-4 py-2 d-flex align-items-center" @click="weatherStore.getLocation">
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
            <div class="spinner-grow" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </template>
      </Suspense>
    </section>
  </main>
  <!-- Modal -->
  <Teleport to="#modal">
    <div class="modal fade" id="searchModal" tabindex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen-sm-down">
        <div class="modal-content text-light bg-dark">
          <div class="modal-header">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="fs-4"/>
            <input type="text" class="form-control bg-transparent border-0 shadow-none text-light fs-4" placeholder="Search city..." v-model="city" @keydown="weatherStore.searchCity($event)">
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body py-0">
            <label class="d-flex align-items-center bg-gray-100 rounded-pill mx-md-auto mx-0 ms-auto position-relative">
              <div v-if="cityList.length" class="position-absolute start-0 top-100 end-0 z-1 bg-gray-100 py-2">
                <label v-for="city in cityList" :key="city.latlon" class="d-flex align-items-center ps-4 citypicked" data-bs-dismiss="modal">
                  <input type="radio" :value="city.latlon" v-model="cityPicked" class="d-none" @click="weatherStore.getCityPicked(city.latlon, city.name)">
                  <font-awesome-icon :icon="['fas', 'location-dot']" class="fs-4 me-2" />
                  <div class="p-1">
                    <p class="mb-0">{{ city.name }}</p>
                    <p class="small text-secondary mb-0">{{ city.country }}</p>
                  </div>
                </label>
              </div>
            </label>
            <div v-if="recentCities.length" class="py-3">
              <label v-for="recentCity in recentCities" :key="recentCity" class="py-3 px-4 lead d-block">
                <input type="radio" :value="recentCity" v-model="city" class="d-none">
                {{ recentCity }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<template>
      <div class="container-fluid">
        <div class="row">
      <!-- Left side -->
          <div class="col-12 col-md-5 col-xl-3">
            <div class="card bg-gray-100 rounded-5 p-3 p-md-4 mb-4">
              <div class="card-body text-light">
                <div class="d-flex justify-content-between align-items-center">
                  <h3 class="fw-light mb-0">Now</h3>
                  <p class="lead mb-0 text-secondary" :class="{'opacity-50': flash}">{{ realTimeClock }}</p>
                </div>
                <div class="row align-items-center flex-nowrap mt-3">
                  <div class="col">
                    <p class="mb-1" style="font-size: 3.5rem;">{{ weatherDetails.current.temp_c }}<sup>o<sub>c</sub></sup></p>
                  </div>
                  <div class="col text-end">
                    <img :src="weatherDetails.current.condition.icon" alt="113" width="80" style="transform: scale(1.3)">
                  </div>
                </div>
                <p>{{ weatherDetails.current.condition.text }}</p>
                <div class="bar border-1 border-bottom border-secondary mb-3"></div>
                <div class="mb-3">
                  <font-awesome-icon :icon="['far', 'calendar']" class="fs-3" />
                  <span class="text-secondary ms-3">{{ new Date(weatherDetails.location.localtime).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' }) }}</span>
                </div>
                <div>
                  <font-awesome-icon :icon="['fas', 'location-dot']" class="fs-3" />
                  <span class="text-secondary ms-3">{{ weatherDetails.location.name }}, {{ weatherDetails.location.country }}</span>
                </div>
              </div>
            </div>
            <h3 class="mb-4">3 Days Forecast</h3>
            <div class="card bg-gray-100 rounded-5 p-3 p-md-4 mb-4">
              <div class="card-body text-light">
                <div class="row align-items-end mb-4" v-for="(forecast, index) in weatherDetails.forecast.forecastday" :key="index">
                  <div class="col d-flex align-items-center">
                    <img :src="forecast.day.condition.icon" :alt="forecast.day.condition.text" width="40" style="transform: scale(1.3)">
                    <span class="display-6 ms-2">{{ forecast.day.avgtemp_c }}<sup>o</sup></span>
                  </div>
                  <div class="col text-center">
                    <p class="mb-0 text-secondary">{{ new Date(forecast.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}</p>
                  </div>
                  <div class="col">
                    <p class="mb-0 text-secondary">{{ weatherStore.getDayInWeek(forecast.date) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

      <!-- Right side -->
          <div class="col-12 col-md-7 col-xl-9">
            <div class="card bg-gray-100 rounded-5 p-3 p-md-4 mb-4">
              <div class="card-body text-light">
                <h3 class="fw-light mb-3">Todays Highlights</h3>
                <div class="row flex-grow-1 mb-3">
                  <div class="col-12 col-xxl-6 mb-3 mb-xl-0">
                    <div class="card bg-gray-300 text-light shadow-none border-0 rounded-4">
                      <div class="card-body">
                        <div class="d-flex justify-content-between mb-3 align-items-center">
                            <h4 class="card-title fw-light text-secondary">Air Quality Index</h4>
                            <span type="button" class="btn rounded-pill px-4" :class="{
                                'btn-green': weatherDetails.current.air_quality['us-epa-index'] === 1,
                                'btn-yellow': weatherDetails.current.air_quality['us-epa-index'] === 2,
                                'btn-orange': weatherDetails.current.air_quality['us-epa-index'] === 3,
                                'btn-red': weatherDetails.current.air_quality['us-epa-index'] === 4,
                                'btn-purple': weatherDetails.current.air_quality['us-epa-index'] === 5,
                                'btn-coral': weatherDetails.current.air_quality['us-epa-index'] === 6,
                                }">
                                {{ weatherStore.getAirQuality(weatherDetails.current.air_quality['us-epa-index']) }}
                            </span>
                        </div>
                        <div class="row align-items-center">
                          <div class="col-2">
                            <font-awesome-icon :icon="['fas', 'wind']" class="display-3" />
                          </div>
                          <div class="col-10">
                            <div class="row row-cols-2 row-cols-lg-4">
                              <div class="col text-center d-flex flex-row-reverse align-items-end d-sm-block">
                                <p class="small text-secondary">PM25</p>
                                <p class="fs-2 fw-light me-1 me-sm-0">{{ weatherDetails.current.air_quality.pm2_5 }}</p>
                              </div>
                              <div class="col text-center d-flex flex-row-reverse align-items-end d-sm-block">
                                <p class="small text-secondary">SO<sub>2</sub></p>
                                <p class="fs-2 fw-light me-1 me-sm-0">{{ weatherDetails.current.air_quality.so2 }}</p>
                              </div>
                              <div class="col text-center d-flex flex-row-reverse align-items-end d-sm-block">
                                <p class="small text-secondary">NO<sub>2</sub></p>
                                <p class="fs-2 fw-light me-1 me-sm-0">{{ weatherDetails.current.air_quality.no2 }}</p>
                              </div>
                              <div class="col text-center d-flex flex-row-reverse align-items-end d-sm-block">
                                <p class="small text-secondary">O<sub>3</sub></p>
                                <p class="fs-2 fw-light me-1 me-sm-0">{{ weatherDetails.current.air_quality.o3 }}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-xxl-6">
                    <div class="card bg-gray-300 text-light shadow-none border-0 rounded-4 h-100">
                      <div class="card-body">
                        <h4 class="card-title fw-light text-secondary mb-3">Sunrise & Sunset</h4>
                        <div class="row align-items-center">
                          <div class="col">
                            <div class="row align-items-center">
                              <div class="col-12 col-md-4 mb-2 mb-md-0">
                                <i class="bi bi-brightness-high display-5"></i>
                              </div>
                              <div class="col-12 col-md-8">
                                <p class="small text-secondary mb-0">Sunrise</p>
                                <p class="fs-2 fw-light">{{ weatherDetails.forecast.forecastday[0].astro.sunrise }}</p>
                              </div>
                            </div>
                          </div>
                          <div class="col">
                            <div class="row align-items-center">
                              <div class="col-12 col-md-4 mb-2 mb-md-0">
                                <i class="bi bi-moon display-5"></i>
                              </div>
                              <div class="col-12 col-md-8">
                                <p class="small text-secondary mb-0">Sunset</p>
                                <p class="fs-2 fw-light">{{ weatherDetails.forecast.forecastday[0].astro.sunset }}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-3">
                  <div class="col">
                    <div class="card bg-gray-300 rounded-4 p-4 border-0 shadow-none">
                      <h4 class="card-title fw-light text-secondary mb-3">Humidity</h4>
                      <div class="d-flex justify-content-between align-items-center text-light">
                        <i class="bi bi-droplet-half fs-2"></i>
                        <p class="fs-2 fw-light mb-0">{{ weatherDetails.current.humidity }}%</p>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card bg-gray-300 rounded-4 p-4 border-0 shadow-none">
                      <h4 class="card-title fw-light text-secondary mb-3">Pressure</h4>
                      <div class="d-flex justify-content-between align-items-center text-light">
                        <font-awesome-icon :icon="['fas', 'water']" class="fs-2" />
                        <p class="fs-2 fw-light mb-0">{{ weatherDetails.current.pressure_mb }}hPA</p>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card bg-gray-300 rounded-4 p-4 border-0 shadow-none">
                      <h4 class="card-title fw-light text-secondary mb-3">Visibility</h4>
                      <div class="d-flex justify-content-between align-items-center text-light">
                        <font-awesome-icon :icon="['far', 'eye']" class="fs-2" />
                        <p class="fs-2 fw-light mb-0">{{ weatherDetails.current.vis_km }}km</p>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card bg-gray-300 rounded-4 p-4 border-0 shadow-none">
                      <h4 class="card-title fw-light text-secondary mb-3">Feels Like</h4>
                      <div class="d-flex justify-content-between align-items-center text-light">
                        <font-awesome-icon :icon="['fas', 'temperature-high']" class="fs-2" />
                        <p class="fs-2 fw-light mb-0">{{ weatherDetails.current.feelslike_c }}<sup>o<sub>c</sub></sup></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h3 class="mb-4">Today at</h3>
            <div class="card shadow-none border-0 bg-transparent">
              <div class="row flex-grow-1 g-1 g-md-2 g-lg-3 g-xl-4 overflow-scroll text-light d-flex flex-nowrap hideScrollbar">
                <div class="col h-100" v-for="hour in todayDetails" :key="hour.time">
                  <div class="text-center bg-gray-100 rounded-3 p-2 mb-3 mb-md-4">
                    <p class="mb-0 fw-light text-nowrap">{{ weatherStore.getHour(hour.time.substring(11)) }}</p>
                    <img :src="hour.condition.icon" :alt="hour.condition.text" width="50">
                    <p class="mb-0 fs-5 fw-light">{{ hour.temp_c }}<sup>o</sup></p>
                  </div>
                  <div class="text-center bg-gray-100 rounded-3 p-2">
                    <p class="mb-0 fw-light">{{ weatherStore.getHour(hour.time.substring(11)) }}</p>
                    <font-awesome-icon :icon="['fas', 'location-arrow']" class="my-3 fs-2 text-primary" :style="{transform: `rotate(calc(${hour.wind_kph}deg * 3))`}" />
                    <p class="mb-0 fw-light">{{ hour.wind_kph }} km/h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '../stores/weatherStore'

const weatherStore = useWeatherStore();
const { weatherDetails, todayDetails, realTimeClock, flash } = storeToRefs(weatherStore);

await weatherStore.getWeatherDetails();

</script>
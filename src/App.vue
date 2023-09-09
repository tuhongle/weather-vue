<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWeatherStore } from './stores/weatherStore'

const weatherStore = useWeatherStore();
const { city, cityList, cityPicked } = storeToRefs(weatherStore);
</script>

<template>
  <main class="vh-100 vw-100 bg-dark text-light overflow-x-hidden hideScrollbar">
    <nav class="navbar navbar-expand py-3">
      <div class="container-fluid justify-content-between align-items-center">
        <a href="#" class="navbar-brand d-flex align-items-end">
          <img src="/logo-white.png" alt="logo" class="img-fluid" width="50">
          <span class="ms-2 h1 text-light fw-medium mb-0">firocther</span>
        </a>
        <div class="input-group justify-content-md-center justify-content-end me-3 me-md-0">
          <label class="d-flex align-items-center px-4 py-2 bg-gray-100 rounded-pill">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            <input type="text" class="d-none d-md-inline-block form-control bg-transparent border-0 shadow-none text-light" placeholder="Search city..." v-model="city">
          </label>
          <select v-model="cityPicked">
            <option v-for="city in cityList" :key="city.latlon" :value="city.latlon" class="d-flex flex-column">
              <font-awesome-icon :icon="['fas', 'location-dot']" class="fs-3" />
              <div>
                <p class="lead mb-0">{{ city.name }}</p>
                <p class="small text-secondary">{{ city.country }}</p>
              </div>
            </option>
          </select>
        </div>
        <div>
          <button class="btn btn-info rounded-pill text-nowrap px-4 py-2 d-flex align-items-center" @click="weatherStore.getCities">
            <font-awesome-icon :icon="['fas', 'location-crosshairs']" />
            <span class="d-none d-md-inline-block ms-2">Current Location</span>
          </button>
        </div>
      </div>
    </nav>
    <section class="content py-5">
      <div class="container-fluid">
        <div class="row">
      <!-- Left side -->
          <div class="col-12 col-md-5 col-xl-3">
            <div class="card bg-gray-100 rounded-5 p-3 p-md-4 mb-4">
              <div class="card-body text-light">
                <div class="d-flex justify-content-between align-items-center">
                  <h3 class="fw-light mb-0">Now</h3>
                  <p class="lead mb-0 text-secondary">16:30</p>
                </div>
                <div class="row align-items-end flex-nowrap">
                  <div class="col">
                    <p class="mb-1" style="font-size: 5rem;">5<sup>o<sub>c</sub></sup></p>
                  </div>
                  <div class="col">
                    <img src="/icons/day/113.png" alt="113" width="120px" class="object-fit-contain">
                  </div>
                </div>
                <p>Broken Clouds</p>
                <div class="bar border-1 border-bottom border-secondary mb-3"></div>
                <div class="mb-3">
                  <font-awesome-icon :icon="['far', 'calendar']" class="fs-3" />
                  <span class="text-secondary ms-3">Wednesday 1, Mar</span>
                </div>
                <div>
                  <font-awesome-icon :icon="['fas', 'location-dot']" class="fs-3" />
                  <span class="text-secondary ms-3">London, GB</span>
                </div>
              </div>
            </div>
            <h3 class="mb-4">3 Days Forecast</h3>
            <div class="card bg-gray-100 rounded-5 p-3 p-md-4 mb-4">
              <div class="card-body text-light">
                <div class="row align-items-end mb-4">
                  <div class="col d-flex align-items-center">
                    <img src="/icons/day/260.png" alt="260.png" class="img-fluid" width="40px">
                    <span class="display-6 ms-1">7<sup>o</sup></span>
                  </div>
                  <div class="col">
                    <p class="mb-0 text-secondary">2 Mar</p>
                  </div>
                  <div class="col">
                    <p class="mb-0 text-secondary">Thursday</p>
                  </div>
                </div>
                <div class="row align-items-end mb-4">
                  <div class="col d-flex align-items-center">
                    <img src="/icons/day/260.png" alt="260.png" class="img-fluid" width="40px">
                    <span class="display-6 ms-1">7<sup>o</sup></span>
                  </div>
                  <div class="col">
                    <p class="mb-0 text-secondary">2 Mar</p>
                  </div>
                  <div class="col">
                    <p class="mb-0 text-secondary">Thursday</p>
                  </div>
                </div>
                <div class="row align-items-end mb-4">
                  <div class="col d-flex align-items-center">
                    <img src="/icons/day/260.png" alt="260.png" class="img-fluid" width="40px">
                    <span class="display-6 ms-1">7<sup>o</sup></span>
                  </div>
                  <div class="col">
                    <p class="mb-0 text-secondary">2 Mar</p>
                  </div>
                  <div class="col">
                    <p class="mb-0 text-secondary">Thursday</p>
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
                          <span type="button" class="btn btn-success rounded-pill px-4">Good</span>
                        </div>
                        <div class="row align-items-center">
                          <div class="col-2">
                            <font-awesome-icon :icon="['fas', 'wind']" class="display-3" />
                          </div>
                          <div class="col-10">
                            <div class="row row-cols-2 row-cols-lg-4">
                              <div class="col text-center d-flex flex-row-reverse align-items-end d-sm-block">
                                <p class="small text-secondary">PM25</p>
                                <p class="fs-2 fw-light me-1 me-sm-0">3.90</p>
                              </div>
                              <div class="col text-center d-flex flex-row-reverse align-items-end d-sm-block">
                                <p class="small text-secondary">SO<sub>2</sub></p>
                                <p class="fs-2 fw-light me-1 me-sm-0">3.90</p>
                              </div>
                              <div class="col text-center d-flex flex-row-reverse align-items-end d-sm-block">
                                <p class="small text-secondary">NO<sub>2</sub></p>
                                <p class="fs-2 fw-light me-1 me-sm-0">3.90</p>
                              </div>
                              <div class="col text-center d-flex flex-row-reverse align-items-end d-sm-block">
                                <p class="small text-secondary">O<sub>3</sub></p>
                                <p class="fs-2 fw-light me-1 me-sm-0">3.90</p>
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
                                <p class="fs-2 fw-light">6:45 AM</p>
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
                                <p class="fs-2 fw-light">6:45 PM</p>
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
                        <p class="fs-2 fw-light mb-0">82%</p>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card bg-gray-300 rounded-4 p-4 border-0 shadow-none">
                      <h4 class="card-title fw-light text-secondary mb-3">Pressure</h4>
                      <div class="d-flex justify-content-between align-items-center text-light">
                        <font-awesome-icon :icon="['fas', 'water']" class="fs-2" />
                        <p class="fs-2 fw-light mb-0">82hPA</p>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card bg-gray-300 rounded-4 p-4 border-0 shadow-none">
                      <h4 class="card-title fw-light text-secondary mb-3">Visibility</h4>
                      <div class="d-flex justify-content-between align-items-center text-light">
                        <font-awesome-icon :icon="['far', 'eye']" class="fs-2" />
                        <p class="fs-2 fw-light mb-0">82km</p>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card bg-gray-300 rounded-4 p-4 border-0 shadow-none">
                      <h4 class="card-title fw-light text-secondary mb-3">Feels Like</h4>
                      <div class="d-flex justify-content-between align-items-center text-light">
                        <font-awesome-icon :icon="['fas', 'temperature-high']" class="fs-2" />
                        <p class="fs-2 fw-light mb-0">82<sup>o<sub>c</sub></sup></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h3 class="mb-4">Today at</h3>
            <div class="card shadow-none border-0 bg-transparent">
              <div class="row flex-grow-1 g-1 g-md-2 g-lg-3 g-xl-4 overflow-scroll text-light d-flex flex-nowrap hideScrollbar">
                <div class="col h-100">
                  <div class="text-center bg-gray-100 rounded-3 p-2 mb-3 mb-md-4">
                    <p class="mb-0 fw-light text-nowrap">12 AM</p>
                    <img src="/icons/night/113.png" alt="" class="w-100">
                    <p class="mb-0 fs-5 fw-light">5<sup>o</sup></p>
                  </div>
                  <div class="text-center bg-gray-100 rounded-3 p-2">
                    <p class="mb-0 fw-light">12 AM</p>
                    <font-awesome-icon :icon="['fas', 'location-arrow']" class="my-3 fs-3 text-primary"/>
                    <p class="mb-0 fw-light">9 km/h</p>
                  </div>
                </div>
                <div class="col h-100">
                  <div class="text-center bg-gray-100 rounded-3 p-2 mb-3 mb-md-4">
                    <p class="mb-0 fw-light text-nowrap">3 AM</p>
                    <img src="/icons/night/113.png" alt="" class="w-100">
                    <p class="mb-0 fs-5 fw-light">5<sup>o</sup></p>
                  </div>
                  <div class="text-center bg-gray-100 rounded-3 p-2">
                    <p class="mb-0 fw-light">3 AM</p>
                    <font-awesome-icon :icon="['fas', 'location-arrow']" class="my-3 fs-3 text-primary"/>
                    <p class="mb-0 fw-light">9 km/h</p>
                  </div>
                </div>
                <div class="col h-100">
                  <div class="text-center bg-gray-100 rounded-3 p-2 mb-3 mb-md-4">
                    <p class="mb-0 fw-light text-nowrap">6 AM</p>
                    <img src="/icons/night/113.png" alt="" class="w-100">
                    <p class="mb-0 fs-5 fw-light">5<sup>o</sup></p>
                  </div>
                  <div class="text-center bg-gray-100 rounded-3 p-2">
                    <p class="mb-0 fw-light">6 AM</p>
                    <font-awesome-icon :icon="['fas', 'location-arrow']" class="my-3 fs-3 text-primary"/>
                    <p class="mb-0 fw-light">9 km/h</p>
                  </div>
                </div>
                <div class="col h-100">
                  <div class="text-center bg-gray-100 rounded-3 p-2 mb-3 mb-md-4">
                    <p class="mb-0 fw-light text-nowrap">9 AM</p>
                    <img src="/icons/night/113.png" alt="" class="w-100">
                    <p class="mb-0 fs-5 fw-light">5<sup>o</sup></p>
                  </div>
                  <div class="text-center bg-gray-100 rounded-3 p-2">
                    <p class="mb-0 fw-light">9 AM</p>
                    <font-awesome-icon :icon="['fas', 'location-arrow']" class="my-3 fs-3 text-primary"/>
                    <p class="mb-0 fw-light">9 km/h</p>
                  </div>
                </div>
                <div class="col h-100">
                  <div class="text-center bg-gray-100 rounded-3 p-2 mb-3 mb-md-4">
                    <p class="mb-0 fw-light text-nowrap">12 PM</p>
                    <img src="/icons/night/113.png" alt="" class="w-100">
                    <p class="mb-0 fs-5 fw-light">5<sup>o</sup></p>
                  </div>
                  <div class="text-center bg-gray-100 rounded-3 p-2">
                    <p class="mb-0 fw-light">12 PM</p>
                    <font-awesome-icon :icon="['fas', 'location-arrow']" class="my-3 fs-3 text-primary"/>
                    <p class="mb-0 fw-light">9 km/h</p>
                  </div>
                </div>
                <div class="col h-100">
                  <div class="text-center bg-gray-100 rounded-3 p-2 mb-3 mb-md-4">
                    <p class="mb-0 fw-light text-nowrap">3 PM</p>
                    <img src="/icons/night/113.png" alt="" class="w-100">
                    <p class="mb-0 fs-5 fw-light">5<sup>o</sup></p>
                  </div>
                  <div class="text-center bg-gray-100 rounded-3 p-2">
                    <p class="mb-0 fw-light">3 PM</p>
                    <font-awesome-icon :icon="['fas', 'location-arrow']" class="my-3 fs-3 text-primary"/>
                    <p class="mb-0 fw-light">9 km/h</p>
                  </div>
                </div>
                <div class="col h-100">
                  <div class="text-center bg-gray-100 rounded-3 p-2 mb-3 mb-md-4">
                    <p class="mb-0 fw-light text-nowrap">6 PM</p>
                    <img src="/icons/night/113.png" alt="" class="w-100">
                    <p class="mb-0 fs-5 fw-light">5<sup>o</sup></p>
                  </div>
                  <div class="text-center bg-gray-100 rounded-3 p-2">
                    <p class="mb-0 fw-light">6 PM</p>
                    <font-awesome-icon :icon="['fas', 'location-arrow']" class="my-3 fs-3 text-primary"/>
                    <p class="mb-0 fw-light">9 km/h</p>
                  </div>
                </div>
                <div class="col h-100">
                  <div class="text-center bg-gray-100 rounded-3 p-2 mb-3 mb-md-4">
                    <p class="mb-0 fw-light text-nowrap">9 PM</p>
                    <img src="/icons/night/113.png" alt="" class="w-100">
                    <p class="mb-0 fs-5 fw-light">5<sup>o</sup></p>
                  </div>
                  <div class="text-center bg-gray-100 rounded-3 p-2">
                    <p class="mb-0 fw-light">9 PM</p>
                    <font-awesome-icon :icon="['fas', 'location-arrow']" class="my-3 fs-3 text-primary"/>
                    <p class="mb-0 fw-light">9 km/h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

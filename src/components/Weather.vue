<template>
  <div class="card shadow-lg">
    <div class="card-body p-5 text-center">
        <div class="form-group mb-5">
            <input type="text" class="form-control rounded-pill shadow-none py-3" placeholder="Search city" v-model="city">
        </div>
        <p class="text-muted mb-5 display-6">Feels Like <span class="fw-bold display-5">24<sup>o</sup></span></p>
        <div class="weather-temperature mx-auto mb-5 bg-white shadow d-flex align-items-center justify-content-center">
            <p class="display-4 text-dark fw-bolder">24.5</p>
            <div class="temp-icons img-shadow">
                <img src="https://cdn.weatherapi.com/weather/64x64/day/389.png" class="">
            </div>
            <div class="temp-icons">
                <img src="https://cdn.weatherapi.com/weather/64x64/day/389.png" alt="">
            </div>
        </div>
        <p class="temp-status lead text-muted fw-medium mb-5">Broken Clouds</p>
        <div class="weather-info text-muted d-flex justify-content-between border-top border-3 pt-4">
            <p class="wind mb-0 lead">
                <i class="bi bi-wind"></i>
                5.66
            </p>
            <p class="humidity mb-0 lead">
                <i class="bi bi-droplet"></i>
                %83
            </p>
            <p class="cloud mb-0 lead">
                <i class="bi bi-cloud"></i>
                %100
            </p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Weather',
    data() {
        return {
            city: '',
            weatherInfo: [],
        }
    },
    methods: {
        async function getWeatherInfo() {
            const linkToFetch = "https://api.weatherapi.com/v1/current.json?key=1e6a2dfa788645aa991173151230205&q="+ this.city.toLowerCase().replace(' ', '+') +"&aqi=no";
            const Response = await fetch(linkToFetch);
            const jsonResponse = await Response.json();
            
        }
    }
}
</script>
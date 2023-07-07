<template>
  <div class="card shadow-lg">
    <div class="card-body p-5 text-center">
        <div class="form-group mb-5 dropdown">
            <input type="search" ref="input" class="text-dark fs-5 form-control rounded-pill shadow-none" placeholder="Search city" v-model="city" @keydown.enter="searchCity" @keypress="startSearch = true" @keyup.delete="noResult = false">
            <ul v-if="selectCities.length && startSearch" class="cities-list list-unstyled w-100 shadow">
                <li class="form-check city-item text-start ps-0" v-for="(selectCity, index) in selectCities" :key="index">
                    <label class="form-check-label py-2 ps-3 w-100" @click="delaySearchCity">
                        <input type="radio" v-model="city" :value="selectCity" class="form-check-input d-none">
                        {{ selectCity }}
                    </label>
                </li>
            </ul>
            <p v-if="noResult" class="small text-danger pt-3">No results found! Please fix and try again!</p>
            <p v-if="city" class="small country">{{ country }}</p>
        </div>
        <p class="text-muted mb-5 display-6">Feels Like <span class="fw-bold display-5">{{ feelsLike }}<sup>o</sup></span></p>
        <div class="weather-temperature mx-auto mb-5 bg-white shadow-lg d-flex align-items-center justify-content-center">
            <p class="display-3 text-dark fw-bolder">{{ temp }}</p>
            <div class="temp-icons">
                <img :src="'https:' + iconLink" alt="">
            </div>
        </div>
        <p class="temp-status lead text-muted fw-medium mb-5">{{ text }}</p>
        <div class="weather-info text-muted d-flex justify-content-between border-top border-3 pt-4">
            <p class="wind mb-0 lead" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Wind kph">
                <i class="bi bi-wind"></i>
                {{ wind }}
            </p>
            <p class="humidity mb-0 lead" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Humidity">
                <i class="bi bi-droplet"></i>
                %{{ humidity }}
            </p>
            <p class="cloud mb-0 lead" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Cloud">
                <i class="bi bi-cloud"></i>
                %{{ cloud }}
            </p>
        </div>
    </div>
  </div>
</template>

<script>
import { Tooltip } from 'bootstrap';

export default {
    name: 'Weather',
    data() {
        return {
            rainy: false,
            sunny: false,
            cloudy: false,
            error: false,
            city: 'Ho Chi Minh',
            noResult: false,
            startSearch: false,
            country: '',
            citiesList: [],
            weatherInfo: {},
            feelsLike: null,
            temp: null,
            text: '',
            wind: null,
            humidity: null,
            cloud: null,
            iconLink: '',
        }
    },
    computed: {
        selectCities() {
            if (this.city.length > 2) {
                const lists = this.citiesList.filter((el) => el.includes(this.city.toLowerCase()));
                if (lists.length >= 7) {
                    return lists.slice(0,7);
                } else {
                    return lists;
                }
            } else {
                return [];
            }
        }
    },
    methods: {
        getWeatherInfo: async function() {
            try {
                const linkToFetch = "https://api.weatherapi.com/v1/current.json?key=1e6a2dfa788645aa991173151230205&q="+ this.city.toLowerCase().replace(' ', '+') +"&aqi=no";
                const Response = await fetch(linkToFetch);
                const jsonResponse = await Response.json();
                if (!jsonResponse.error) {
                    return jsonResponse;
                } else {
                    return false;
                }
            } catch (err) {
                console.log(err);
            }
        },
        getCitiesList: async function() {
            try {
                const lists = [];
                const linkToFetch = 'https://countriesnow.space/api/v0.1/countries';
                const Response = await fetch(linkToFetch);
                const jsonResponse = await Response.json();
                jsonResponse.data.map((el) => {
                    lists.push(...el.cities.map(el => el.toLowerCase()));
                });
                return lists;
            } catch (err) {
                console.log(err);
            }
        },
        searchCity: function() {
            this.$refs.input.blur();
            if (this.weatherInfo) {
                this.country = this.weatherInfo.location.country;
                this.feelsLike = this.weatherInfo.current.feelslike_c;
                this.temp = this.weatherInfo.current.temp_c;
                this.text = this.weatherInfo.current.condition.text;
                this.iconLink = this.weatherInfo.current.condition.icon;
                this.wind = this.weatherInfo.current.wind_kph;
                this.humidity = this.weatherInfo.current.humidity;
                this.cloud = this.weatherInfo.current.cloud;
                this.noResult = false;
            } else {
                this.country = null;
                this.feelsLike = 0;
                this.temp = 0;
                this.text = '';
                this.iconLink = '';
                this.wind = null;
                this.humidity = null;
                this.cloud = null;
                this.noResult = true;
            }
            this.startSearch = false;
            if (this.text.includes('rain')) {
                this.rainy = true;
                this.cloudy = false;
                this.sunny = false;
                this.error = false;
            } else if (this.text.includes('cloudy') || this.text.includes('mist')) {
                this.rainy = false;
                this.cloudy = true;
                this.sunny = false;
                this.error = false;
            } else if (!this.text) {
                this.rainy = false;
                this.cloudy = false;
                this.sunny = false;
                this.error = true;
            } else {
                this.rainy = false;
                this.cloudy = false;
                this.sunny = true;
                this.error = false;
            };
            this.$emit('updateProps', [this.rainy, this.cloudy, this.sunny, this.error]);
        },
        delaySearchCity() {
            setTimeout(()=> {
                this.searchCity();
                this.startSearch = false;
            },100);
        },
    },
    async created() {
        this.citiesList = await this.getCitiesList();
    },
    async mounted() {
        new Tooltip(document.body, {
            selector: "[data-bs-toggle='tooltip']",
        });
        this.weatherInfo = await this.getWeatherInfo();
        this.country = this.weatherInfo.location.country;
        this.feelsLike = this.weatherInfo.current.feelslike_c;
        this.temp = this.weatherInfo.current.temp_c;
        this.text = this.weatherInfo.current.condition.text;
        this.iconLink = this.weatherInfo.current.condition.icon;
        this.wind = this.weatherInfo.current.wind_kph;
        this.humidity = this.weatherInfo.current.humidity;
        this.cloud = this.weatherInfo.current.cloud;
    },
    async updated() {
        this.weatherInfo = await this.getWeatherInfo();
    }
}
</script>
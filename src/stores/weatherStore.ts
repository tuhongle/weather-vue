import { ref } from "vue"
import { type cityType, type DayNight, Condition } from "@/types/weatherTypes"
import { defineStore } from "pinia"
import { Modal } from 'bootstrap'

export const useWeatherStore = defineStore('weather', () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const city = ref<string>('');
    const realTimeClock = ref<string>('');
    const time = ref<number>();
    const cityPicked = ref<string>('');
    const cityNamePicked = ref<string>('');
    const isCityPicked = ref<boolean>(false);
    const cityList = ref<cityType[]>([]);
    const weatherDetails = ref();
    const todayDetails = ref();
    const isDay = ref<DayNight>();
    const isWeatherDetails = ref<boolean>(false);
    const conditionWeather = ref<Condition>();
    const recentCities = ref<string[]>([]);
    const flash = ref<boolean>(false);

    const clear : number[] = [1000];
    const cloudy : number[] = [1003, 1006, 1009];
    const rainy : number[] = [1030, 1063, 1069, 1072, 1087, 1135, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1273, 1276];
    const snowy : number[] = [1066, 1114, 1117, 1147, 1168, 1171, 1198, 1201, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1240, 1243, 1246, 1249, 1252, 1255, 1258, 1261, 1264, 1279, 1282];

    const hideModal = () => {
        const myModalEl = document.getElementById('searchModal');
        const modal = Modal.getInstance(myModalEl)
        modal.hide();
    };
    
    const getCities = async () => {
        const baseURL = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${city.value}`;
        const response = await fetch(baseURL);
        const data = await response.json();
        cityList.value = data.map((el: any) => {
            return {
                name: el.name,
                country: `${el.region}, ${el.country}`,
                latlon: `${el.lat},${el.lon}`
            };
        });
    }

    const getWeatherDetails = async () => {
        try {
            const query = cityPicked.value ? cityPicked.value : city.value;
            const baseURL = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=3&aqi=yes&alerts=yes`;
            const response = await fetch(baseURL);
            weatherDetails.value = await response.json();
            isDay.value = (weatherDetails.value.current.is_day) ? 'day' : 'night';
            getTodayDetails();
            const clock = weatherDetails.value.location.localtime;
            time.value = new Date(clock).getTime();
            const condition = weatherDetails.value.current.condition.code;
            city.value = '';
            cityPicked.value = '';
            switch (true) {
                case clear.includes(condition):
                  conditionWeather.value = Condition.CLEAR;
                  break;
                case cloudy.includes(condition):
                  conditionWeather.value = Condition.CLOUDY;
                  break;
                case rainy.includes(condition):
                  conditionWeather.value = Condition.RAINY;
                  break;
                case snowy.includes(condition):
                  conditionWeather.value = Condition.SNOWY;
                  break;
              }
        }
        catch (err) {
            console.log(err)
        }
    }

    const getDayInWeek = (data: number) => {
        const day = new Date(data).getDay();
        switch (day) {
            case 0:
                return 'Sunday';
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';
        }
    }

    const getTodayDetails = () => {
        try {
            const hours = weatherDetails.value.forecast.forecastday[0].hour;
            const today = [];
            for (let i = 0; i < 24; i += 3) {
                today.push(hours[i]);
            };
            todayDetails.value = today;
        }
        catch (err) {
            console.log(err)
        }
    }

    const getHour = (data: string) => {
        switch (data) {
            case '00:00':
                return '12 AM';
            case '03:00':
                return '3 AM';
            case '06:00':
                return '6 AM';
            case '09:00':
                return '9 AM';
            case '12:00':
                return '12 PM';
            case '15:00':
                return '3 PM';
            case '18:00':
                return '6 PM';
            case '21:00':
                return '9 PM';
        }
    }
    
    const getAirQuality = (data: number) => {
        switch (data) {
            case 1:
                return "Good";
            case 2:
                return "Moderate";
            case 3:
                return "Unhealthy for sensitive groups";
            case 4:
                return "Unhealthy";
            case 5:
                return "Very unhealthy";
            case 6:
                return "Hazardous";
        }
    }

    const getCityPicked = async (latlon: string, cityname: string) => {
        try {
            cityPicked.value = latlon;
            cityNamePicked.value = cityname;
            if (recentCities.value.length < 5) {
                if (!recentCities.value.includes(cityNamePicked.value)) {
                    recentCities.value.unshift(cityNamePicked.value);
                }
            } else {
                recentCities.value.pop();
                recentCities.value.unshift(cityNamePicked.value);
            }
            isCityPicked.value = true;
            city.value = '';
            isWeatherDetails.value = true;
            await getWeatherDetails();
            cityList.value = [];
        }
        catch (err) {
            console.log(err)
        }
    }

    setInterval(() => {
        flash.value = !flash.value;
        const hours = new Date(time.value!).getHours();
        const minutes = new Date(time.value!).getMinutes();
        time.value! += 1000;
        realTimeClock.value = minutes < 10 ? `${hours}:0${minutes}`: `${hours}:${minutes}`;
    }, 1000);

    const getLocation = async () => {
        await navigator.geolocation.getCurrentPosition(async (position) => {
            const coords = position.coords;
            cityPicked.value = `${coords.latitude},${coords.longitude}`;
            isCityPicked.value = true;
            isWeatherDetails.value = true;
            await getWeatherDetails();
            cityNamePicked.value = weatherDetails.value.location.name;
        });
    }

    const searchCity = async (el : KeyboardEvent) => {
        if (el.key === 'Enter') {
            cityPicked.value = '';
            isWeatherDetails.value = true;
            isCityPicked.value = true;
            cityNamePicked.value = JSON.parse(JSON.stringify(city.value));
            if (recentCities.value.length < 5) {
                if (!recentCities.value.includes(cityNamePicked.value)) {
                    recentCities.value.unshift(cityNamePicked.value);
                }
            } else {
                recentCities.value.pop();
                recentCities.value.unshift(cityNamePicked.value);
            };
            await getWeatherDetails();
            cityList.value = [];
            hideModal();
        }
    }

    return {
        city, cityList, cityPicked, cityNamePicked, isCityPicked, weatherDetails, todayDetails, isWeatherDetails, realTimeClock, isDay, conditionWeather, recentCities, flash
        , getCities, getWeatherDetails, getDayInWeek, getHour, getAirQuality, getCityPicked, getLocation, searchCity
    }
})
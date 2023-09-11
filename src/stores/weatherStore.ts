import { ref } from "vue"
import { type cityType } from "@/types/weatherTypes"
import { defineStore } from "pinia"

export const useWeatherStore = defineStore('weather', () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const city = ref<string>('');
    const cityPicked = ref<string>('');
    const cityList = ref<cityType[]>([]);
    const weatherDetails = ref();
    const todayDetails = ref();
    const isDay = ref<boolean>();
    const isWeatherDetails = ref<boolean>(false);
    
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
        const query = cityPicked.value ? cityPicked.value : city.value;
        const baseURL = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=3&aqi=yes&alerts=yes`;
        const response = await fetch(baseURL);
        weatherDetails.value = await response.json();
        isDay.value = (weatherDetails.value.current.is_day) ? true : false;
        getTodayDetails();
    }

    const getDayInWeek = (data) => {
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
        const hours = weatherDetails.value.forecast.forecastday[0].hour;
        const today = [];
        for (let i = 0; i < 24; i += 3) {
            today.push(hours[i]);
        };
        todayDetails.value = today;
    }

    const getHour = (data) => {
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
    
    const getAirQuality = (data) => {
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

    const getCityPicked = async (data) => {
        cityList.value = [];
        cityPicked.value = data;
        isWeatherDetails.value = true;
        await getWeatherDetails();
    }

    return {
        city, cityList, cityPicked, weatherDetails, todayDetails, isWeatherDetails
        , getCities, getWeatherDetails, getDayInWeek, getHour, getAirQuality, getCityPicked
    }
})
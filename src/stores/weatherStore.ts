import { ref } from "vue"
import { type cityType } from "@/types/weatherTypes"
import { defineStore } from "pinia"

export const useWeatherStore = defineStore('weather', () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const city = ref<string>('');
    const cityPicked = ref<string>('');
    const cityList = ref<cityType[]>([]);
    
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
        console.log(cityList.value);
    }

    const getWeatherDetails = async () => {
        const baseURL = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityPicked.value}&days=3&aqi=yes&alerts=yes`;
        const response = await fetch(baseURL);
        const data = await response.json();
    }

    return {
        city, cityList, cityPicked
        , getCities, getWeatherDetails
    }
})
<template>
  <Transition name="weatherCard" appear>
    <Weather @updateProps="changeBackground"/>
  </Transition>
  <Transition name="weather" appear v-for="info in weatherInfo" :key="info">
    <div v-if="info.value" class="weather-backdrop" :class="'weather-' + info.title"></div>
  </Transition>
</template>

<script>
import Weather from './components/Weather.vue'

export default {
  name: 'App',
  components: {
    Weather
  },
  data() {
    return {
      weatherInfo : [
        {title: "rainy", value: false},
        {title: "cloudy", value: true},
        {title: "sunny", value: false},
        {title: "error", value: false},
      ],
    }
  },
  methods: {
    changeBackground(info) {
      this.weatherInfo = [
        {title: "rainy", value: info[0]},
        {title: "cloudy", value: info[1]},
        {title: "sunny", value: info[2]},
        {title: "error", value: info[3]},
      ];
    }
  }
}
</script>

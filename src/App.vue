<template>
  <Weather @updateProps="changeBackground"/>
  <div class="weather-backdrop" :class="{'weather-sunny': sunny, 'weather-rainy': rainy, 'weather-cloudy': cloudy, 'error': error}"></div>
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
      rainy : false,
      cloudy: true,
      sunny: false,
      error: false,
    }
  },
  methods: {
    changeBackground(info) {
      this.rainy = info[0];
      this.cloudy = info[1];
      this.sunny = info[2];
      this.error = info[3];
    }
  }
}
</script>

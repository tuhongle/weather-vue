<template>
  <div class="weather-backdrop" :class="{'weather-sunny': sunny, 'weather-rainy': rainy, 'weather-cloudy': cloudy}">
    
  </div>
</template>

<script>
export default {
  props: ['sunny', 'rainy', 'cloudy']
}
</script>
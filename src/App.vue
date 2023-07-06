<template>
  <Weather />
  <Backdrop />
</template>

<script>
import Weather from './components/Weather.vue'
import Backdrop from './components/Backdrop.vue'

export default {
  name: 'App',
  components: {
    Weather,
    Backdrop
  }
}
</script>

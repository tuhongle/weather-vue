import './assets/main.scss'
import 'bootstrap'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faLocationArrow, faLocationCrosshairs, faLocationDot, faMagnifyingGlass, faTemperatureHalf, faTemperatureHigh, faWater, faWind } from '@fortawesome/free-solid-svg-icons'
import { faCalendar, faEye } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(faMagnifyingGlass, faLocationCrosshairs, faCalendar, faLocationDot, faWind, faWater, faEye, faTemperatureHigh, faLocationArrow)

const app = createApp(App)

app.use(createPinia())
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')

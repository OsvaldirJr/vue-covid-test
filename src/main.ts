import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import store from './stores/dataStore.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App)

app.use(router)
app.use(VueAxios,axios)
app.use(store)

app.use(createPinia())

app.mount('#app')

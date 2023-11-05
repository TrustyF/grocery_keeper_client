import './assets/base.css'

import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const local_api = "http://localhost:5000"
const server_api = "https://trustyfox.pythonanywhere.com"
// const devMode = import.meta.env.DEV
const devMode = true

const app = createApp(App)

app.use(router)
app.use(ConfirmationService);
app.use(PrimeVue);

app.provide('curr_api', devMode ? local_api : server_api)

app.mount('#app')

import { createPinia } from 'pinia';
import { createApp, markRaw } from 'vue'
import { router } from "./router";
import App from './App.vue'

import 'animate.css'

const pinia = createPinia()
pinia.use(({store}) => {
    store.router = markRaw(router)
})

import { SplashScreen } from "@capacitor/splash-screen";
SplashScreen.hide()

import './main.css'
import 'animate.css';
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')

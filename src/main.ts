import { createApp } from 'vue'
import { router } from "./router";
import { store } from "./store";
import App from './App.vue'

import 'animate.css'

import { SplashScreen } from "@capacitor/splash-screen";
SplashScreen.hide()
import './main.css'
import 'animate.css';
createApp(App).use(router).use(store).mount('#app')

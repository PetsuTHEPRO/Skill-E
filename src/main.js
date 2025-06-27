import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
    // You can set your default options here
};

import VueDarkMode from '@vue-a11y/dark-mode'
const app = createApp(App)

app.use(VueDarkMode, {
    defaultMode: 'light', // Modo padrão, pode ser 'light', 'dark', ou 'system'
    modes: ['light', 'dark', 'system'], // Modos disponíveis
    className: 'custom-mode', // Classe CSS para o modo
    storage: 'localStorage', // Tipo de armazenamento (localStorage ou sessionStorage)
    metaThemeColor: {
      // Define a cor do tema para o meta tag
      light: '#ffffff',
      dark: '#000000',
    },
    ariaLabel: 'Toggle to %cm mode color', // Rótulo ARIA
    ariaLive: '%cm color mode is enabled', // Mensagem ARIA
  });
app.use(Toast, options);
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(Buefy)

app.mount('#app')

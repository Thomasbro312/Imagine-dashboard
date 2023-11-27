import './assets/main.css';
import router from './router.js';
import store from './store/index.js';
import TheNavBar from './components/ui/TheNavBar.vue';
import BaseButton from "@/components/ui/BaseButton.vue";


import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.component('nav-bar', TheNavBar);
app.component('base-button', BaseButton);

app.use(router);
app.use(store);

app.mount('#app');

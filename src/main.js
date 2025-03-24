import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueGtag from "vue-gtag";

// no tips
const app = createApp(App);
app.config.productionTip = false;

// Analytics
app.use(VueGtag, {
    config: { id: "UA-75833214-1" }
});

// service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
        }).catch(registrationError => {
            console.log('registrationError =>', registrationError);
        });
    });
}

// instance
app.use(router).mount('#app');

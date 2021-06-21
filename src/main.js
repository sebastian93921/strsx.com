import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueAnalytics from 'vue-analytics';

// no tips
Vue.config.productionTip = false;

// Analytics
Vue.use(VueAnalytics, {
    id: 'UA-75833214-1',
    router
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
new Vue({
    router,
    render: h => h(App),
}).$mount('#app');

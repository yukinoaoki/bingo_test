import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios' //追記
import VueAxios from 'vue-axios' //追記


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { firebaseConfig } from "./firebase.config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export { app }
Vue.config.productionTip = false

Vue.use(VueAxios, axios) //追記

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
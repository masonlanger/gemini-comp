import './index.css'
import { createApp } from 'vue'
import App from './App.vue'
import routes from './router'

import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebaseConfig'

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";

import { createWebHistory, createRouter } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes
})

//libraries
library.add(fas)

//firebaseConfig
const firebaseConfig = {
  apiKey: "AIzaSyDJVdA_3RrXlVhYBe2BTS8VltoZsKwbMi8",
  authDomain: "writing-fellow.firebaseapp.com",
  projectId: "writing-fellow",
  storageBucket: "writing-fellow.appspot.com",
  messagingSenderId: "93130071094",
  appId: "1:93130071094:web:137a6a6d4defd98e898c97",
  measurementId: "G-C45TTXCC59"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const usersRef = collection(db, 'users');

//web app set up and mount
createApp(App)
    .use(router)
    .use(VueFire, {
        firebaseApp,
        modules: [
            VueFireAuth(),
        ],
    })
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
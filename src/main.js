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

library.add(fas)

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
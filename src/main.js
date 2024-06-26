import './index.css'
import { createApp } from 'vue'
import App from './App.vue'
import routes from './router'

import { createWebHistory, createRouter } from 'vue-router'

import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebaseConfig'

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";

const router = createRouter({
  history: createWebHistory(),
  routes
})

//libraries
library.add(fas)

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
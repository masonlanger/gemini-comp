import HomeView from './views/HomeView.vue'
import DashboardView from './views/DashboardView.vue'
import LibraryView from './views/LibraryView.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'

import { createWebHistory, createRouter } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomeView },
        { path: '/dashboard', component: DashboardView },
        { path: '/lib', component: LibraryView },
        { path: '/register', component: Register},
        { path: 'login', component: Login}
    ],
  });

export default router;
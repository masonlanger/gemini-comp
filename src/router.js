import HomeView from './views/HomeView.vue'
import DashboardView from './views/DashboardView.vue'
import LibraryView from './views/LibraryView.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/dashboard', component: DashboardView },
    { path: '/lib', component: LibraryView },
    { path: '/login', component: Login },
    { path: '/register', component: Register },

]
export default routes;
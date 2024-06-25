import HomeView from './views/HomeView.vue'
import DashboardView from './views/DashboardView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/dashboard', component: DashboardView },
]
export default routes;
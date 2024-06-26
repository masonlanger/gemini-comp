import HomeView from './views/HomeView.vue'
import DashboardView from './views/DashboardView.vue'
import LibraryView from './views/LibraryView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/dashboard', component: DashboardView },
    { path: '/lib', component: LibraryView }
]
export default routes;
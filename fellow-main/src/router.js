import HomeView from './views/HomeView.vue'
import DashboardView from './views/DashboardView.vue'
import LibraryView from './views/LibraryView.vue'
import LoginView from './views/LoginView.vue'
import Register from './views/Register.vue'
import ProfileView from './views/ProfileView.vue'

const routes = [
    { path: '/', component: HomeView, meta: {title: "Fellow"} },
    { path: '/dashboard', component: DashboardView, meta: {requiresAuth: true, title: "Library - Fellow"} },
    { path: '/lib', component: LibraryView, meta: {requiresAuth: true, title: "Notebooks - Fellow"} },
    { path: '/login', component: LoginView, meta: {title: "Login - Fellow"} },
    { path: '/register', component: Register, meta: {title: "Register - Fellow"} },
    { path: '/profile', component: ProfileView, meta: {requiresAuth: true, title: "Profile - Fellow"} },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: HomeView },
]
export default routes;
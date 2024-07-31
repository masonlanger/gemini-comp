import HomeView from './views/HomeView.vue'
import DashboardView from './views/DashboardView.vue'
import LibraryView from './views/LibraryView.vue'
import LoginView from './views/LoginView.vue'
import Register from './views/Register.vue'
import CompleteRegister from './views/CompleteRegister.vue'
import ProfileView from './views/ProfileView.vue'
import PublicProfileView from './views/PublicProfileView.vue'

const routes = [
    { path: '/', component: HomeView, meta: {title: "Fellow"} },
    { path: '/library', component: DashboardView, meta: {requiresAuth: true, title: "Library - Fellow"} },
    { path: '/notebooks', component: LibraryView, meta: {requiresAuth: true, title: "Notebooks - Fellow"} },
    { path: '/login', component: LoginView, meta: {title: "Login - Fellow"} },
    { path: '/register', component: Register, meta: {title: "Register - Fellow"} },
    { path: '/register/complete-register', component: CompleteRegister, meta: {title: "Complete Registration - Fellow"} },
    { path: '/profile', component: ProfileView, meta: {requiresAuth: true, title: "Profile - Fellow"} },
    { path: '/writers/:username', component: PublicProfileView, meta: {requiresAuth: true} },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: HomeView },
]
export default routes;
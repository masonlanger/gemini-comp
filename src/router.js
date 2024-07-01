import HomeView from './views/HomeView.vue'
import DashboardView from './views/DashboardView.vue'
import LibraryView from './views/LibraryView.vue'
import LoginView from './views/LoginView.vue'
import Register from './views/Register.vue'
import EditorView from './views/EditorView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/dashboard', component: DashboardView },
    { path: '/lib', component: LibraryView },
    { path: '/login', component: LoginView },
    { path: '/register', component: Register },
    { path: '/editor', component: EditorView }

]
export default routes;
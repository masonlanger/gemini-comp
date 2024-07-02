import HomeView from './views/HomeView.vue'
import DashboardView from './views/DashboardView.vue'
import LibraryView from './views/LibraryView.vue'
import LoginView from './views/LoginView.vue'
import NotebookView from './views/NotebookView.vue'
import Register from './views/Register.vue'
import EditorView from './views/EditorView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/dashboard', component: DashboardView, meta: {requiresAuth: true} },
    { path: '/lib', component: LibraryView, meta: {requiresAuth: true} },
    { path: '/login', component: LoginView },
    { path: '/register', component: Register },
    { path: '/editor', component: EditorView, meta: {requiresAuth: true} },
    { path: '/notebook/:id', component: NotebookView, props: true}
]
export default routes;
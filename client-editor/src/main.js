import './index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { firebaseApp } from './firebaseConfig'
import { VueFire, VueFireAuth } from 'vuefire'

const app = createApp(App)

app.use(router)
app.use(firebaseApp)
.use(VueFire, {
    firebaseApp,
    modules: [
        VueFireAuth(),
    ],
})

app.mount('#app')

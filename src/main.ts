import { createApp } from 'vue'
import App from './App.vue'

import { router } from '@/router'
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createApp(App)

// app.config.globalProperties.
app.use(router)
app.mount('#app')

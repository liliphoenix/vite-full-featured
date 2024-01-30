import { createApp } from 'vue'
import App from './App.vue'

import { router } from '@/router'
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createApp(App)

// 定义全局变量
app.config.globalProperties.$isRole = false
app.config.globalProperties.$prefix = 'bobi-vue-admin'

// app.config.globalProperties.
app.use(router)
app.mount('#app')

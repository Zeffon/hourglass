import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'

// 引入全局样式
import '@/assets/scss/index.scss'

createApp(App).use(store).mount('#popup')

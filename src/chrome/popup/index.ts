import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import * as echarts from 'echarts';

// 引入全局样式
import '@/assets/scss/index.scss'

const app = createApp(App)
app.config.globalProperties.echarts = echarts // 挂载echars

app.use(store).mount('#popup')

import '@/bootstrap.js';
//import 'flowbite';
import router from '@/router/routes.js';
import { createApp } from 'vue';
import App from '@/App.vue';
import 'v-calendar/style.css';
import VCalendar from 'v-calendar';
//in your `main.js` file
import '../../node_modules/flowbite-vue/dist/index.css'
const app = createApp(App);
window.axios.defaults.baseURL = document.head.querySelector('meta[name="api-base-url"]').content
app.config.globalProperties.$x_csrf_token = document.head.querySelector('meta[name="csrf-token"]').content
app.use(VCalendar, {})
app.use(router);
app.mount('#app')

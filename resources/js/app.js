import '@/bootstrap.js';
//import 'flowbite';
import router from '@/router/routes.js';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Notifications from '@kyvg/vue3-notification'
import handleShowMsg from '@/handleShowMsg.js'
import App from '@/App.vue';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
//in your `main.js` file
import '../../node_modules/flowbite-vue/dist/index.css'
const app = createApp(App);
window.axios.defaults.baseURL = document.head.querySelector('meta[name="api-base-url"]').content
app.config.globalProperties.$x_csrf_token = document.head.querySelector('meta[name="csrf-token"]').content
app.config.globalProperties.$handleMessage = function(message, type) {
    let mess = handleShowMsg(message)
    if (mess) {
       this.$notify({
            group: 'foo',
            text: mess,
            type: type
        });
    }
}
const pinia = createPinia()

app.use(pinia)
app.use(VCalendar, {})
app.use(Notifications)
app.use(router);
app.mount('#app')

import {createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/pages/Home.vue'
import NotFoundView from '@/pages/NotFound.vue'
import OrderBetween from '../pages/OrderBetween.vue'
import Login from '../pages/Login.vue'

const routes = [
  { path: '/', component: HomeView, name: 'home' },
  { path: '/orders', component: OrderBetween, name:'order_between' },
  {path:'/login', component:Login, name:'login'},
  {  path: '/:pathMatch(.*)*',name: "not_found",component: NotFoundView},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;

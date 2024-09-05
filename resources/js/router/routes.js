import {createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/pages/Home.vue'
import AboutView from '@/pages/About.vue'
import NotFoundView from '@/pages/NotFound.vue'
import OrderBetween from '../pages/OrderBetween.vue'

const routes = [
  { path: '/', component: HomeView, name: 'home' },
  { path: '/about', component: AboutView, name:'about' },
  { path: '/orders', component: OrderBetween, name:'order_between' },
  {   path: '/:pathMatch(.*)*',name: "not_found",component: NotFoundView},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;

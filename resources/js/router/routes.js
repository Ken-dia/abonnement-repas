import {createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/pages/Home.vue'
import NotFoundView from '@/pages/NotFound.vue'
import OrderBetween from '../pages/OrderBetween.vue'
import Login from '../pages/Login.vue'
import { useAuthStore } from '../stores/auth'

const routes = [
  { 
    path: '/', 
    component: HomeView, 
    name: 'home',
    meta: { requiresAdmin: true }
  },
  { 
    path: '/orders', 
    component: OrderBetween, 
    name:'order_between',
    meta: { requiresAdmin: true }
  },
  {path:'/login', component:Login, name:'login'},
  {  path: '/:pathMatch(.*)*',name: "not_found",component: NotFoundView},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next('/login')
  } else {
    next()
  }
})

export default router;

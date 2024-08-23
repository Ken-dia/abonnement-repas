import {createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/pages/Home.vue'
import AboutView from '@/pages/About.vue'
import NotFoundView from '@/pages/NotFound.vue'

const routes = [
  { path: '/', component: HomeView, name: 'home' },
  { path: '/about', component: AboutView, name:'about' },
  {   path: '/:pathMatch(.*)*',name: "not_found",component: NotFoundView},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;

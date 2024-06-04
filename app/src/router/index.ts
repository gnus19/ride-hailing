import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/auth/login'
      // component: HomeView
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/rides',
      name: 'rides',
      component: () => import('../views/RidesView.vue')
    }
  ]
})

export default router

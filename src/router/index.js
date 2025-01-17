import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/employee',
      name: 'employee',
      component: () => import('../views/EmployeeView.vue')
    },
    {
      path: '/department',
      name: 'department',
      component: () => import('../views/DepartmentView.vue')
    }
  ]
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '../views/Main.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/imprint',
    name: 'Imprint',
    component: () => import(/* webpackChunkName: "imprint" */ '../views/Imprint.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

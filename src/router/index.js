import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Prices from '../views/Prices.vue'
import Account from '../views/Account.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'

import store from './../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/prices',
    name: 'Prices',
    component: Prices
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['user/isLogin']) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router

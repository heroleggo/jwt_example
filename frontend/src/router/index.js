import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Login from '../components/Login'
import Me from '../components/Me'
import Change from '../components/Change'
import Remove from '../components/Remove'
import Register from '../components/Register'
import store from '../store'

Vue.use(Router)

const requireAuth = () => (to, from, next) => {
  if (store.getters.isAuthenticated) return next()
  next('/login?returnPath=me')
}

const req2 = () => (to, from, next) => {
  if (store.getters.isAuthenticated) return next()
  next('/login?returnPath=change')
}

const req3 = () => (to, from, next) => {
  if (store.getters.isAuthenticated) return next()
  next('/login?returnPath=remove')
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/me',
      name: 'Me',
      component: Me,
      beforeEnter: requireAuth()
    },
    {
      path: '/change',
      name: 'Change',
      component: Change,
      beforeEnter: req2()
    },
    {
      path: '/remove',
      name: 'Remove',
      component: Remove,
      beforeEnter: req3()
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
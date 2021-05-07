import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Register from '@/components/Register'
import UserBoard from '@/components/UserBoard'
import Admin from '@/components/Admin'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        guest: true
      }
    },
    {
      path: '/dashboard',
      name: 'UserBoard',
      component: UserBoard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) { // If the route has requiresAuth
    if (localStorage.getItem('jwt') == null) { // Authentication jwt check "Is Logged In"
      next({ path: '/login', params: { nextUrl: to.fullPath } }) // Redirect to '/login'
    } else { // Authentication "is valid"
      let user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(record => record.meta.is_admin)) { // If the route has is_admin
        if (user.is_admin === 1) { // Check if user has admin rights
          next()
        } else {
          next({ name: 'UserBoard' }) // Redirect to user home if no admin rights
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) { // If the route has guest
    if (localStorage.getItem('jwt') == null) { // Authentication jwt check "Is Logged In"
      next()
    } else {
      next({ name: 'UserBoard' }) // Redirect to user home if not guest
    }
  } else {
    next()
  }
})

export default router

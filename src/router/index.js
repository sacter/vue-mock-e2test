import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import firstPage from '@/components/firstPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/firstPage',
      name: 'firstPage',
      component: firstPage
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '../components/pages/HomePage'
import LoginPage from '../components/pages/LoginPage'
import RegisterPage from '../components/pages/RegisterPage'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage }
  ]
})

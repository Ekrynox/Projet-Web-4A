import Vue from 'vue'
import Router from 'vue-router'

import ContactsPage from '../components/pages/ContactsPage'
import LoginPage from '../components/pages/LoginPage'
import RegisterPage from '../components/pages/RegisterPage'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/contacts', component: ContactsPage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage }
  ]
})

import Vue from 'vue'
import Vuex from 'vuex'

import LoginStore from './store/login'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    LoginStore
  },
  state: {
    api: 'http://localhost/api/'
  },
  getters: {
    getApi (state) {
      return state.api
    }
  }
})

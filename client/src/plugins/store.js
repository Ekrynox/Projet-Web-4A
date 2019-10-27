import Vue from 'vue'
import Vuex from 'vuex'

import LoginStore from './store/users'
import FriendsStore from './store/friends'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    LoginStore,
    FriendsStore
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

import Vue from 'vue'
import Vuex from 'vuex'

import LoginStore from './store/users'
import FriendsStore from './store/friends'
import MessagesStore from './store/messages'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    LoginStore,
    FriendsStore,
    MessagesStore
  },
  state: {
    api: process.env.VUE_APP_API
  },
  getters: {
    getApi (state) {
      return state.api
    }
  }
})

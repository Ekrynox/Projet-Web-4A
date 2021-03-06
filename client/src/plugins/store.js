import Vue from 'vue'
import Vuex from 'vuex'

import LoginStore from './store/users'
import FriendsStore from './store/friends'
import MessagesStore from './store/messages'
import GroupsStore from './store/groups'
import MessagesGroupsStore from './store/messagesGroups'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    LoginStore,
    FriendsStore,
    MessagesStore,
    GroupsStore,
    MessagesGroupsStore
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

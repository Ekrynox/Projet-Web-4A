import axios from 'axios'

export default {
  state: {
    friends: []
  },
  getters: {
    getFriends: (state) => state.friends,
    isFriend: (state) => (id) => state.friends.find(user => user.id === id) !== undefined
  },
  mutations: {
    setFriends: (state, friends) => { state.friends = friends }
  },
  actions: {
    getFriends (store) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'get',
          url: store.getters.getApi + 'friends?timestamp=' + new Date().getTime(),
          responseType: 'json',
          withCredentials: true
        })
          .then((response) => {
            if (response.data.error === undefined) {
              store.commit('setFriends', response.data)
            } else if (response.data.error === 'not_logged') {
              store.commit('setFriends', [])
              store.commit('setUser', null)
            } else {
              store.commit('setFriends', [])
            }
            resolve(response.data)
          })
          .catch((error) => {
            store.commit('setFriends', [])
            reject(error)
          })
      })
    },
    addFriend (store, id) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'post',
          url: store.getters.getApi + 'friends?timestamp=' + new Date().getTime(),
          responseType: 'json',
          data: {
            id: id
          },
          withCredentials: true
        })
          .then((response) => {
            if (response.data.error === undefined) {
              store.dispatch('getFriends')
            } else if (response.data.error === 'not_logged') {
              store.commit('setUser', null)
            }
            resolve(response.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    removeFriend (store, id) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'delete',
          url: store.getters.getApi + 'friends/' + id + '?timestamp=' + new Date().getTime(),
          responseType: 'json',
          withCredentials: true
        })
          .then((response) => {
            if (response.data.error === undefined) {
              store.dispatch('getFriends')
            } else if (response.data.error === 'not_logged') {
              store.commit('setUser', null)
            }
            resolve(response.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
}

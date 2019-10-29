import axios from 'axios'

export default {
  state: {
    user: undefined
  },
  getters: {
    isLogged: (state) => state.user !== undefined,
    getUser: (state) => state.user
  },
  mutations: {
    setLogged: (state, logged) => { state.logged = logged },
    setUser: (state, user) => { state.user = user }
  },
  actions: {
    getUser (store, id) {
      if (id === undefined) {
        return new Promise(function (resolve, reject) {
          axios({
            method: 'get',
            url: store.getters.getApi + 'users?timestamp=' + new Date().getTime(),
            responseType: 'json',
            withCredentials: true
          })
            .then((response) => {
              if (response.data.error === undefined) {
                store.commit('setUser', response.data)
              } else {
                store.commit('setUser', undefined)
              }
              resolve(response.data)
            })
            .catch((error) => {
              reject(error)
            })
        })
      }
      return new Promise(function (resolve, reject) {
        axios({
          method: 'get',
          url: store.getters.getApi + 'users/' + id + '?timestamp=' + new Date().getTime(),
          responseType: 'json',
          withCredentials: true
        })
          .then((response) => {
            resolve(response.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    searchUsers (store, filter) {
      if (filter === undefined) {
        filter = ''
      }
      return new Promise(function (resolve, reject) {
        !store.getters.isLogged && resolve({ error: 'not_logged' })

        axios({
          method: 'get',
          url: store.getters.getApi + 'users/search/' + filter + '?timestamp=' + new Date().getTime(),
          responseType: 'json',
          withCredentials: true
        })
          .then((response) => {
            if (response.data.error === 'not_logged') {
              store.commit('setUser', undefined)
            }
            resolve(response.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    register (store, { email, pseudo, password }) {
      return new Promise(function (resolve, reject) {
        store.getters.isLogged && resolve({ error: 'already_logged' })

        axios({
          method: 'post',
          url: store.getters.getApi + 'users?timestamp=' + new Date().getTime(),
          responseType: 'json',
          data: {
            email: email,
            pseudo: pseudo,
            password: password
          },
          withCredentials: true
        })
          .then((response) => {
            if (response.data.error === 'already_logged') {
              store.dispatch('getUser')
            }
            resolve(response.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    login (store, { email, password }) {
      return new Promise(function (resolve, reject) {
        store.getters.isLogged && resolve({ error: 'already_logged' })

        axios({
          method: 'post',
          url: store.getters.getApi + 'auth/login?timestamp=' + new Date().getTime(),
          responseType: 'json',
          data: {
            email: email,
            password: password
          },
          withCredentials: true
        })
          .then((response) => {
            if (response.data.error === undefined) {
              store.commit('setUser', response.data)
            } else if (response.data.error === 'already_logged') {
              store.dispatch('getUser')
            } else {
              store.commit('setUser', undefined)
            }
            resolve(response.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    logout (store) {
      return new Promise(function (resolve, reject) {
        !store.getters.isLogged && resolve({ error: 'not_logged' })

        axios({
          method: 'post',
          url: store.getters.getApi + 'auth/logout?timestamp=' + new Date().getTime(),
          responseType: 'json',
          withCredentials: true
        })
          .then((response) => {
            store.commit('setUser', undefined)
            resolve(response.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
}

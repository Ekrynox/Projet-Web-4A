import axios from 'axios'

export default {
  state: {
    logged: false,
    user: null
  },
  getters: {
    isLogged (state) {
      return state.logged
    }
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
                store.commit('setLogged', true)
                store.commit('setUser', response.data)
              } else {
                store.commit('setLogged', false)
                store.commit('setUser', null)
              }
              resolve(response.data)
            })
            .catch((error) => {
              reject(error.response.data)
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
            reject(error.response.data)
          })
      })
    },
    register (store, { email, pseudo, password }) {
      return new Promise(function (resolve, reject) {
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
            resolve(response.data)
          })
          .catch((error) => {
            reject(error.response.data)
          })
      })
    },
    login (store, { email, password }) {
      return new Promise(function (resolve, reject) {
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
              store.commit('setLogged', true)
              store.commit('setUser', response.data)
            }
            resolve(response.data)
          })
          .catch((error) => {
            reject(error.response.data)
          })
      })
    },
    logout (store) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'post',
          url: store.getters.getApi + 'auth/logout?timestamp=' + new Date().getTime(),
          responseType: 'json',
          withCredentials: true
        })
          .then((response) => {
            store.commit('setLogged', false)
            store.commit('setUser', null)
            resolve(response.data)
          })
          .catch((error) => {
            reject(error.response.data)
          })
      })
    }
  }
}

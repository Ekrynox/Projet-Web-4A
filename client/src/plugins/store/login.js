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
    login (store, { email, password }) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'post',
          url: store.getters.getApi + 'users/login?timestamp=' + new Date().getTime(),
          responseType: 'json',
          data: {
            email: email,
            password: password
          },
          withCredentials: true
        })
          .then((response) => {
            store.commit('setLogged', true)
            store.commit('setUser', response.data)
            resolve(response.data)
          })
          .catch((error) => {
            resolve(error.response.data)
          })
      })
    }
  }
}

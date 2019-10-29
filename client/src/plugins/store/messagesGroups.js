import axios from 'axios'

export default {
  actions: {
    getMessagesGroups (store, id) {
      return new Promise(function (resolve, reject) {
        !store.getters.isLogged && resolve({ error: 'not_logged' })

        axios({
          method: 'get',
          url: store.getters.getApi + 'messagesGroups/' + id + '?timestamp=' + new Date().getTime(),
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
    addMessageGroups (store, { id, data }) {
      return new Promise(function (resolve, reject) {
        !store.getters.isLogged && resolve({ error: 'not_logged' })

        axios({
          method: 'post',
          url: store.getters.getApi + 'messagesGroups?timestamp=' + new Date().getTime(),
          responseType: 'json',
          data: {
            id: id,
            data: data
          },
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
    }
  }
}

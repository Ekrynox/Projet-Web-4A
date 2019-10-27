import axios from 'axios'

export default {
  actions: {
    getMessages (store, id) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'get',
          url: store.getters.getApi + 'messages/' + id + '?timestamp=' + new Date().getTime(),
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
    addMessage (store, { id, data }) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'post',
          url: store.getters.getApi + 'messages?timestamp=' + new Date().getTime(),
          responseType: 'json',
          data: {
            id: id,
            data: data
          },
          withCredentials: true
        })
          .then((response) => {
            resolve(response.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
}

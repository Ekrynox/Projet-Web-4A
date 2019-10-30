import axios from 'axios'

export default {
  state: {
    groups: []
  },
  getters: {
    getGroups: (state) => state.groups,
    inGroup: (state, getters) => (id) => getters.isLogged && state.user.groups.include(id)
  },
  mutations: {
    setGroups: (state, groups) => { state.groups = groups },
    setGroup: (state, group) => {
      const index = state.groups.indexOf((item) => item.id === group.id)
      if (index > -1) {
        state.groups[index] = group
      }
    }
  },
  actions: {
    getGroups (store) {
      return new Promise(function (resolve, reject) {
        !store.getters.isLogged && resolve({ error: 'not_logged' })

        axios({
          method: 'get',
          url: store.getters.getApi + 'groups?timestamp=' + new Date().getTime(),
          responseType: 'json',
          withCredentials: true
        })
          .then((response) => {
            if (response.data.error === undefined) {
              store.commit('setGroups', response.data)
            } else if (response.data.error === 'not_logged') {
              store.commit('setUser', undefined)
            } else {
              store.commit('setGroups', [])
            }
            resolve(response.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getGroup (store, id) {
      return new Promise(function (resolve, reject) {
        !store.getters.isLogged && resolve({ error: 'not_logged' })

        axios({
          method: 'get',
          url: store.getters.getApi + 'groups/' + id + '?timestamp=' + new Date().getTime(),
          responseType: 'json',
          withCredentials: true
        })
          .then((response) => {
            if (response.data.error === undefined) {
              store.commit('setGroup', response.data)
            } else if (response.data.error === 'not_logged') {
              store.commit('setUser', undefined)
            }
            resolve(response.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    addGroup (store) {
      return new Promise(function (resolve, reject) {
        !store.getters.isLogged && resolve({ error: 'not_logged' })

        axios({
          method: 'post',
          url: store.getters.getApi + 'groups?timestamp=' + new Date().getTime(),
          responseType: 'json',
          withCredentials: true
        })
          .then((response) => {
            if (response.data.error === undefined) {
              store.dispatch('getGroups')
            } else if (response.data.error === 'not_logged') {
              store.commit('setUser', undefined)
            }
            resolve(response.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    removeGroup (store, id) {
      return new Promise(function (resolve, reject) {
        !store.getters.isLogged && resolve({ error: 'not_logged' })

        axios({
          method: 'delete',
          url: store.getters.getApi + 'groups/' + id + '?timestamp=' + new Date().getTime(),
          responseType: 'json',
          withCredentials: true
        })
          .then((response) => {
            if (response.data.error === undefined) {
              store.dispatch('getGroups')
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
    updateGroup (store, { id, name }) {
      return new Promise(function (resolve, reject) {
        !store.getters.isLogged && resolve({ error: 'not_logged' })

        axios({
          method: 'put',
          url: store.getters.getApi + 'groups/' + id + '?timestamp=' + new Date().getTime(),
          responseType: 'json',
          data: {
            name: name
          },
          withCredentials: true
        })
          .then((response) => {
            if (response.data.error === undefined) {
              store.dispatch('getGroup', id)
            } else if (response.data.error === 'not_logged') {
              store.commit('setUser', undefined)
            }
            resolve(response.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    addUserToGroup (store, { groupid, userid }) {
      return new Promise(function (resolve, reject) {
        !store.getters.isLogged && resolve({ error: 'not_logged' })

        axios({
          method: 'post',
          url: store.getters.getApi + 'groups/' + groupid + '/users?timestamp=' + new Date().getTime(),
          responseType: 'json',
          data: {
            id: userid
          },
          withCredentials: true
        })
          .then((response) => {
            if (response.data.error === undefined) {
              store.dispatch('getGroup', groupid)
            } else if (response.data.error === 'not_logged') {
              store.commit('setUser', undefined)
            }
            resolve(response.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    removeUserFromGroup (store, { groupid, userid }) {
      return new Promise(function (resolve, reject) {
        !store.getters.isLogged && resolve({ error: 'not_logged' })

        axios({
          method: 'delete',
          url: store.getters.getApi + 'groups/' + groupid + '/users/' + userid + '?timestamp=' + new Date().getTime(),
          responseType: 'json',
          withCredentials: true
        })
          .then((response) => {
            if (response.data.error === undefined) {
              store.dispatch('getGroup', groupid)
            } else if (response.data.error === 'not_logged') {
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

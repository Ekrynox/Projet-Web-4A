<template>
  <v-card height="100%" max-height="100%" tile>
    <v-list class="pa-0" v-if="userOrGroup !== undefined">
      <v-subheader v-html="isAUser ? userOrGroup.pseudo : userOrGroup.name" />

      <v-list-item v-if="!isAUser">
        <v-select label="Add Users" @blur="addUsersToGroup" :items="friendsToAdd" multiple v-model="selectedUsersAdd"/>
      </v-list-item>

      <v-list-item v-if="!isAUser">
        <v-select label="Remove Users" @blur="removeUsersFromGroup" :items="usersToRemove" multiple v-model="selectedUsersRemove"/>
      </v-list-item>

      <v-list-item v-if="!isAUser" @click="deleteGroup">
        <v-list-item-icon>
          <v-icon color="error">mdi-delete</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="error--text">Remove</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    userOrGroup: {
      required: true
    }
  },
  data: function () {
    return {
      selectedUsersAdd: [],
      selectedUsersRemove: []
    }
  },
  computed: {
    isAUser: function () { return this.userOrGroup.pseudo !== undefined },
    friendsToAdd: function () {
      let data = []
      this.$store.getters.getFriends.forEach(user => {
        data.push({ value: user, text: user.pseudo })
      })
      this.userOrGroup.users.forEach(user => {
        data = data.filter(row => row.value.id !== user.id)
      })
      return data
    },
    usersToRemove: function () {
      const data = []
      this.userOrGroup.users.forEach(user => {
        data.push({ value: user, text: user.pseudo })
      })
      return data
    }
  },
  methods: {
    isTheUser: function (id) { return this.$store.getters.getUser.id === id },
    deleteGroup: function () {
      this.$store.dispatch('removeGroup', this.userOrGroup.id)
    },
    addUsersToGroup: function () {
      const users = Array.from(this.selectedUsersAdd)
      this.selectedUsersAdd = []
      users.forEach((user) => {
        this.$store.dispatch('addUserToGroup', { groupid: this.userOrGroup.id, userid: user.id })
      })
    },
    removeUsersFromGroup: function () {
      const users = Array.from(this.selectedUsersRemove)
      this.selectedUsersRemove = []
      users.forEach((user) => {
        this.$store.dispatch('removeUserFromGroup', { groupid: this.userOrGroup.id, userid: user.id })
      })
    }
  }
}
</script>

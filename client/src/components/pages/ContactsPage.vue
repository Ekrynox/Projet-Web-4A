<template>
  <v-col class="pa-0 ma-0 fill-height">
    <v-row class="fill-height">
      <v-col :cols="3" class="d-flex flex-column">
        <v-text-field v-model="filter" prepend-inner-icon="mdi-magnify" label="Search..." solo />
        <UsersList :users="filtered ? users : $store.getters.getFriends" v-model="selectedUser"/>
      </v-col>
      <v-col :cols="9">
        <MessagesList :user="selectedUser"/>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import UsersList from '../UsersList'
import MessagesList from '../MessagesList'

export default {
  components: { UsersList, MessagesList },
  data: function () {
    return {
      filter: '',
      filtered: false,
      users: [],
      selectedUser: undefined
    }
  },
  watch: {
    filter: function (val) {
      if (val === '') {
        this.users = []
        this.filtered = false
      } else {
        this.$store.dispatch('searchUsers', val).then((data) => {
          if (data.error === undefined) {
            this.users = data.filter((user) => this.$store.getters.getUser.id !== user.id)
            this.filtered = true
          } else {
            this.users = []
            this.filtered = true
          }
        })
      }
    }
  }
}
</script>

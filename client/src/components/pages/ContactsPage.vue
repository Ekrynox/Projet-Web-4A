<template>
  <v-col class="pa-0 ma-0 fill-height">
    <v-row class="fill-height">
      <v-col :cols="3" class="d-flex flex-column">
        <v-text-field v-model="filter" prepend-inner-icon="mdi-magnify" label="Search..." solo />
        <UsersGroupsList :items="getUsers" v-model="selectedUser"/>
      </v-col>
      <v-col :cols="9">
        <MessagesList :userOrGroup="selectedUser"/>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import UsersGroupsList from '../UsersGroupsList'
import MessagesList from '../MessagesList'

export default {
  components: { UsersGroupsList, MessagesList },
  data: function () {
    return {
      filter: '',
      filtered: false,
      users: [],
      selectedUser: undefined
    }
  },
  computed: {
    getUsers: function () {
      return (this.filtered ? this.users : Array.from(this.$store.getters.getFriends)).sort((a, b) => a.pseudo.localeCompare(b.pseudo))
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
            this.users = data
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

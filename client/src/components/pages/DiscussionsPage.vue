<template>
  <v-col class="pa-0 ma-0 fill-height">
    <v-row class="fill-height">
      <v-col :cols="2" class="d-flex flex-column">
        <div class="d-flex flex-row">
          <v-btn small fab class="ma-1" color="primary" @click="$store.dispatch('addGroup')">
            <v-icon>mdi-account-multiple-plus</v-icon>
          </v-btn>
          <v-text-field v-model="filter" prepend-inner-icon="mdi-magnify" label="Search..." solo />
        </div>
        <UsersGroupsList :items="getDiscussions" v-model="selectedDiscussions"/>
      </v-col>
      <v-col :cols="10">
        <MessagesList :userOrGroup="selectedDiscussions"/>
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
      selectedDiscussions: undefined
    }
  },
  computed: {
    getDiscussions: function () {
      let filter = this.filter
      if (filter !== '') {
        filter = '(^' + filter + '| ' + filter + ')'
      }
      let discussions = Array.from(this.$store.getters.getGroups).filter(group => filter === '' || group.name.match(RegExp(filter, 'gi')) !== null)
      discussions = discussions.concat(Array.from(this.$store.getters.getDiscussions).filter(user => filter === '' || user.pseudo.match(RegExp(filter, 'gi')) !== null))
      return discussions
    }
  },
  methods: {
    addGroup: function () {
      this.$store.dispatch('addGroup')
    }
  }
}
</script>

<template>
  <v-app>
    <v-content>
        <v-container fill-height fluid>
          <router-view />
          <SettingsDialog v-model="settings"/>
        </v-container>
    </v-content>

    <v-bottom-navigation v-if="logged" grow color="primary">
      <v-btn value="msg" to="msg">
        <span>Discussions</span>
        <v-icon>mdi-android-messages</v-icon>
      </v-btn>

      <v-btn value="contacts" to="contacts">
        <span>Contacts</span>
        <v-icon>mdi-account-group</v-icon>
      </v-btn>

      <v-btn :value="settings" @click="settings = !settings">
        <span>Settings</span>
        <v-icon>mdi-settings</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import SettingsDialog from './components/SettingsDialog'

export default {
  components: {
    SettingsDialog
  },
  data: function () {
    return {
      friendsInterval: undefined,
      groupsInterval: undefined,
      loggedInterval: undefined,
      discussionsInterval: undefined,
      settings: false
    }
  },
  mounted: function () {
    this.$store.dispatch('getUser').then((data) => {
      this.changeRoute(this.logged)
    }, () => {
      this.$router.push('/login')
    })
  },
  computed: {
    ...mapGetters({
      logged: 'isLogged'
    })
  },
  watch: {
    logged: function (val) {
      this.changeRoute(val)
      if (!val) {
        this.$store.commit('setGroups', [])
        this.$store.commit('setFriends', [])
        this.$store.commit('setDiscussions', [])
        this.settings = false
      }
    }
  },
  methods: {
    // If not logged then go to the login page
    changeRoute: function (isLogged) {
      if (this.friendsInterval !== undefined) {
        clearInterval(this.friendsInterval)
        this.friendsInterval = undefined
      }
      if (this.groupsInterval !== undefined) {
        clearInterval(this.groupsInterval)
        this.groupsInterval = undefined
      }
      if (this.loggedInterval !== undefined) {
        clearInterval(this.loggedInterval)
        this.loggedInterval = undefined
      }
      if (this.discussionsInterval !== undefined) {
        clearInterval(this.discussionsInterval)
        this.discussionsInterval = undefined
      }

      if (isLogged === true) {
        this.$store.dispatch('getFriends')
        this.friendsInterval = setInterval(() => { this.$store.dispatch('getFriends') }, 300000)

        this.$store.dispatch('getGroups')
        this.groupsInterval = setInterval(() => { this.$store.dispatch('getGroups') }, 300000)

        this.$store.dispatch('getDiscussions')
        this.discussionsInterval = setInterval(() => { this.$store.dispatch('getDiscussions') }, 5000)

        this.loggedInterval = setInterval(() => { this.$store.dispatch('getUser') }, 300000)

        this.$router.replace('/')
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

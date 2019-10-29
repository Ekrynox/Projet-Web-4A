<template>
  <v-app>
    <v-content>
        <v-container fill-height fluid>
          <router-view />
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

      <v-btn value="settings" to="settings">
        <span>Settings</span>
        <v-icon>mdi-settings</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: function () {
    return {
      friendsInterval: undefined,
      loggedInterval: undefined
    }
  },
  mounted: function () {
    this.$store.dispatch('getUser').then((data) => {
      this.changeRoute(this.logged)
    }, (err) => {
      console.log(err)
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
      if (this.loggedInterval !== undefined) {
        clearInterval(this.loggedInterval)
        this.loggedInterval = undefined
      }

      if (isLogged === true) {
        this.$store.dispatch('getFriends')
        this.friendsInterval = setInterval(() => { this.$store.dispatch('getFriends') }, 300000)

        this.loggedInterval = setInterval(() => { this.$store.dispatch('getUser') }, 300000)

        this.$router.replace('/')
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

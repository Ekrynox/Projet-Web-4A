<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <router-view />
      </v-container>
    </v-content>

    <v-bottom-navigation v-if="$store.getters.isLogged" v-model="bottomNav" grow color="primary">
      <v-btn value="msg" to="msg">
        <span>Discutions</span>
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
export default {
  data: function () {
    return {
      bottomNav: 'msg'
    }
  },
  mounted: function () {
    // If not logged then go to the login page
    this.$store.dispatch('getUser').then((data) => {
      if (!this.$store.getters.isLogged) {
        this.$router.push('/login')
      } else {
        this.$router.push('/')
      }
    }, (err) => {
      console.log(err)
      this.$router.push('/login')
    })
  }
}
</script>

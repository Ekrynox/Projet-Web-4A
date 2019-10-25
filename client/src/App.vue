<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  mounted: function () {
    // If not logged then go to the login page
    this.$store.dispatch('getUser').then((data) => {
      if (!this.$store.getters.isLogged) {
        this.$router.push('/login')
      } else {
        this.$router.replace('/')
      }
    })
  }
}
</script>

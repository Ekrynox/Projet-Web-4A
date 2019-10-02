<template>
  <v-container>
  </v-container>
</template>

<script>
export default {
  mounted: function () {
    if (!this.$store.getters.isLogged) {
      this.$router.replace('login')
    }
  }
}
</script>

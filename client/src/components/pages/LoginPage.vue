<template>
  <div class="d-flex justify-center">
    <v-sheet elevation="4" width="fit-content">
      <form ref="form">
        <v-col :cols="12">
          <v-text-field label="Email" placeholder="xyz@example.com" outlined/>
        </v-col>
        <v-col :cols="12">
          <v-text-field type="password" label="Password" outlined/>
        </v-col>
      </form>
    </v-sheet>
  </div>
</template>

<script>
export default {
  mounted: function () {
    if (this.$store.getters.isLogged) {
      this.$router.back()
    }
  }
}
</script>

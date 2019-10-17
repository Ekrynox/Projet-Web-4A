<template>
  <div class="d-flex justify-center">
    <v-sheet elevation="4" width="fit-content">
      <form ref="form">
        <v-col :cols="12">
          <v-text-field v-model="email" label="Email" placeholder="xyz@example.com" outlined/>
        </v-col>
        <v-col :cols="12">
          <v-text-field v-model="password" type="password" label="Password" outlined/>
        </v-col>
        <v-col :cols="12" >
          <v-btn class="ma-2" tile outlined color="primary" @click="$router.replace('/login')" dark>Already have an Account</v-btn>
          <v-btn class="ma-2" tile color="primary">Register</v-btn>
        </v-col>
      </form>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  }
}
</script>

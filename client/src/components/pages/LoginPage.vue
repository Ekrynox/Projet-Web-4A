<template>
  <div class="d-flex justify-center">
    <v-sheet elevation="4" width="fit-content">
      <form ref="form">
        <v-col :cols="12">
          <v-text-field v-model="email" @change="$v.email.$touch()" @blur="$v.email.$touch()" :error-messages="emailIdErrors" label="Email" placeholder="xyz@example.com" outlined required/>
        </v-col>
        <v-col :cols="12">
          <v-text-field v-model="password" @change="$v.password.$touch()" @blur="$v.password.$touch()" :error-messages="passwordIdErrors" type="password" label="Password" outlined required/>
        </v-col>
        <v-col :cols="12" >
          <v-btn class="ma-2" tile outlined color="primary" @click="$router.replace('/register')" dark>Create an Account</v-btn>
          <v-btn class="ma-2" tile color="primary" @click="submit">Login</v-btn>
        </v-col>
      </form>
    </v-sheet>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) }
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submit: function () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$store.dispatch('login', { email: this.email, password: this.password }).then((data) => {
          if (data.error === undefined || data.error === 'already_logged') {
            if (this.$store.getters.isLogged) {
              this.$router.replace('/')
            }
          }
        })
      }
    }
  },
  computed: {
    emailIdErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('An email is required')
      !this.$v.email.email && errors.push('Invalid email syntax')
      return errors
    },
    passwordIdErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('A password is required')
      !this.$v.password.minLength && errors.push('Passworld should have at least 8 chararcters')
      return errors
    }
  }
}
</script>

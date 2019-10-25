<template>
  <div class="d-flex justify-center">
    <v-sheet elevation="4" width="fit-content">
      <form ref="form">
        <v-col :cols="12">
          <v-text-field v-model="email" @change="$v.email.$touch()" @blur="$v.email.$touch()" :error-messages="emailErrors" label="Email" placeholder="xyz@example.com" outlined required/>
        </v-col>
        <v-col :cols="12">
          <v-text-field v-model="password" @change="$v.password.$touch()" @blur="$v.password.$touch()" :error-messages="passwordErrors" type="password" label="Password" outlined required/>
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
import { required, email, minLength, maxLength, helpers } from 'vuelidate/lib/validators'

const passwordRegex = helpers.regex('passwordRegex', /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$^+=!*()@%&]).{8,32}$/)

export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8), maxLength: maxLength(32), passwordRegex }
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
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('An email is required')
      !this.$v.email.email && errors.push('Invalid email syntax')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('A password is required')
      !this.$v.password.minLength && errors.push('Passworld should have at least 8 chararcters')
      !this.$v.password.maxLength && errors.push('Passworld should have maximum 32 chararcters')
      !this.$v.password.passwordRegex && errors.push('Password need Lower, Upper, digit, Special')
      return errors
    }
  }
}
</script>

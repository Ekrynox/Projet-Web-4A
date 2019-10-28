<template>
  <v-row align="center" justify="center">
    <v-card :loading="loading" raised>
      <form ref="form">
        <v-col :cols="12">
          <v-text-field v-model="email" prepend-icon="mdi-at" @keyup.enter="submit" @change="$v.email.$touch()" @blur="$v.email.$touch()" :error-messages="emailErrors" label="Email" placeholder="xyz@example.com" required/>
        </v-col>
        <v-col :cols="12">
          <v-text-field v-model="password" prepend-icon="mdi-lock" @keyup.enter="submit" @change="$v.password.$touch()" @blur="$v.password.$touch()" :error-messages="passwordErrors" type="password" label="Password" required/>
        </v-col>
        <v-col :cols="12" >
          <v-btn class="ma-2" tile outlined color="primary" @click="$router.replace('/register')" dark>Create an Account</v-btn>
          <v-btn class="ma-2" tile color="primary" @click="submit">Login</v-btn>
        </v-col>
      </form>
    </v-card>
  </v-row>
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
      password: '',
      loading: false
    }
  },
  methods: {
    submit: function () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loading = true
        this.$store.dispatch('login', { email: this.email, password: this.password }).then((data) => {
          this.loading = false
        }, (err) => {
          console.log(err)
          this.loading = false
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

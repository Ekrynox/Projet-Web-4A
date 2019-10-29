<template>
  <v-card :loading="loading" raised class="my-auto mx-auto">
    <form ref="form">
      <v-col :cols="12">
        <v-text-field v-model="email" prepend-icon="mdi-at" @keyup.enter="submit" @change="$v.email.$touch()" @blur="$v.email.$touch()" :error-messages="emailErrors" label="Email" placeholder="xyz@example.com"/>
      </v-col>
      <v-col :cols="12">
        <v-text-field v-model="pseudo" prepend-icon="mdi-account" @keyup.enter="submit" @change="$v.pseudo.$touch()" @blur="$v.pseudo.$touch()" :error-messages="pseudoErrors" label="Pseudo"/>
      </v-col>
      <v-col :cols="12">
        <v-text-field v-model="password" prepend-icon="mdi-lock" @keyup.enter="submit" @change="$v.password.$touch()" @blur="$v.password.$touch()" :error-messages="passwordErrors" type="password" label="Password"/>
      </v-col>
      <v-col :cols="12">
        <v-text-field v-model="passwordbis" prepend-icon="mdi-lock" @keyup.enter="submit" @change="$v.passwordbis.$touch()" @blur="$v.passwordbis.$touch()" :error-messages="passwordBisErrors" type="password" label="Password Confirmation"/>
      </v-col>
      <v-col :cols="12" >
        <v-btn class="ma-2" tile outlined color="primary" @click="$router.replace('/login')" dark>Already have an Account</v-btn>
        <v-btn class="ma-2" tile color="primary" @click="submit">Register</v-btn>
      </v-col>
    </form>
  </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength, maxLength, sameAs, helpers } from 'vuelidate/lib/validators'

const passwordRegex = helpers.regex('passwordRegex', /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$^+=!*()@%&]).{8,32}$/)

export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    pseudo: { required },
    password: { required, minLength: minLength(8), maxLength: maxLength(32), passwordRegex },
    passwordbis: { sameAs: sameAs('password') }
  },
  data () {
    return {
      email: '',
      pseudo: '',
      password: '',
      passwordbis: '',
      loading: false
    }
  },
  methods: {
    submit: function () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loading = true
        this.$store.dispatch('register', { email: this.email, pseudo: this.pseudo, password: this.password }).then((data) => {
          if (data.error === undefined) {
            if (!this.$store.getters.isLogged) {
              this.$router.replace('/login')
              return
            }
          }
          if (data.error === 'already_logged') {
            if (this.$store.getters.isLogged) {
              this.$router.replace('/')
            }
          }
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
    pseudoErrors () {
      const errors = []
      if (!this.$v.pseudo.$dirty) return errors
      !this.$v.pseudo.required && errors.push('A Pseudo is required')
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
    },
    passwordBisErrors () {
      const errors = []
      if (!this.$v.passwordbis.$dirty) return errors
      !this.$v.passwordbis.sameAs && errors.push('Password didn\'t match')
      return errors
    }
  }
}
</script>

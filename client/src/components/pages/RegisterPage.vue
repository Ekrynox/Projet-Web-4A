<template>
  <div class="d-flex justify-center">
    <v-sheet elevation="4" width="fit-content">
      <form ref="form">
        <v-col :cols="12">
          <v-text-field v-model="email" @change="$v.email.$touch()" @blur="$v.email.$touch()" :error-messages="emailErrors" label="Email" placeholder="xyz@example.com" outlined/>
        </v-col>
        <v-col :cols="12">
          <v-text-field v-model="password" @change="$v.password.$touch()" @blur="$v.password.$touch()" :error-messages="passwordErrors" type="password" label="Password" outlined/>
        </v-col>
        <v-col :cols="12">
          <v-text-field v-model="passwordbis" @change="$v.passwordbis.$touch()" @blur="$v.passwordbis.$touch()" :error-messages="passwordBisErrors" type="password" label="Password Confirmation" outlined/>
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
import { validationMixin } from 'vuelidate'
import { required, email, minLength, maxLength, sameAs, helpers } from 'vuelidate/lib/validators'

const passwordRegex = helpers.regex('passwordRegex', /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$^+=!*()@%&]).{8,32}$/)

export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8), maxLength: maxLength(32), passwordRegex },
    passwordbis: { sameAs: sameAs('password') }
  },
  data () {
    return {
      email: '',
      password: '',
      passwordbis: ''
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

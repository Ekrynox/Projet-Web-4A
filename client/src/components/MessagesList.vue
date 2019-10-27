<template>
  <v-card class="pa-4 fill-height d-flex flex-column" tile>
    <v-sheet class="fill-height d-flex flex-column">
      <Message v-for="(message, i) in messages" :key="i" :message="message"/>
    </v-sheet>
    <v-text-field v-model="message" label="Message" @keyup.enter="sendMessage"/>
  </v-card>
</template>

<script>
import Message from './Message'

export default {
  components: { Message },
  props: {
    user: {
      required: true
    }
  },
  data: function () {
    return {
      messages: [],
      message: ''
    }
  },
  watch: {
    user: function (val) {
      if (val === undefined || val.id === undefined) {
        this.messages = []
        return
      }
      this.update(val.id)
    }
  },
  methods: {
    sendMessage: function () {
      if (this.user === undefined || this.user.id === undefined) {
        return
      }
      this.$store.dispatch('addMessage', { id: this.user.id, data: JSON.stringify({ text: this.message }) }).then((data) => {
        this.message = ''
        this.update(this.user.id)
      })
    },
    update: function (id) {
      this.$store.dispatch('getMessages', id).then((data) => {
        if (data.error === undefined) {
          this.messages = data
          this.messages.forEach((message) => { message.data = JSON.parse(message.data) })
          return
        }
        this.messages = []
      }, (err) => {
        console.log(err)
        this.messages = []
      })
    }
  }
}
</script>

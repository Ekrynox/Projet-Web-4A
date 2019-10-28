<template>
  <v-card fixed class="pa-4 fill-height d-flex flex-column overflow-y-auto" tile>
    <v-sheet class="fill-height d-flex flex-column">
      <Message v-for="(message, i) in messages" :key="i" :message="message"/>
    </v-sheet>
    <v-text-field :disabled="user === undefined" v-model="message" label="Message" @keyup.enter="sendMessage"/>
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
      message: '',
      messagesInterval: undefined
    }
  },
  watch: {
    user: function (val) {
      if (this.messagesInterval !== undefined) {
        clearInterval(this.messagesInterval)
        this.messagesInterval = undefined
      }
      if (val === undefined || val.id === undefined) {
        this.messages = []
        return
      }
      this.update(val.id)
      this.messagesInterval = setInterval(() => { this.update(val.id) }, 10000)
    }
  },
  methods: {
    sendMessage: function () {
      if (this.user === undefined || this.user.id === undefined) {
        return
      }
      this.$store.dispatch('addMessage', { id: this.user.id, data: { text: this.message } }).then((data) => {
        this.message = ''
        this.update(this.user.id)
      })
    },
    update: function (id) {
      this.$store.dispatch('getMessages', id).then((data) => {
        if (data.error === undefined) {
          this.messages = data
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

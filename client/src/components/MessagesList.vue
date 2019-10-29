<template>
  <v-card fixed class="pa-4 fill-height d-flex flex-column overflow-y-auto" tile>
    <v-sheet class="fill-height d-flex flex-column">
      <template v-for="(messages, i) in sortedMessages">
        <v-subheader :class="isTheUser(messages[0].user) ? ' ml-auto' : ''" v-html="isTheUser(messages[0].user) ? $store.getters.getUser.pseudo : (isAUser ? userOrGroup.pseudo : '')" :key="'sub-' + i"/>
        <Message v-for="message in messages" :key="message.id" :message="message.data" :isTheUser="isTheUser(message.user)"/>
      </template>
    </v-sheet>
    <v-text-field :disabled="userOrGroup === undefined" v-model="message" label="Message" @keyup.enter="sendMessage"/>
  </v-card>
</template>

<script>
import Message from './Message'

export default {
  components: { Message },
  props: {
    userOrGroup: {
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
  beforeDestroy: function () {
    if (this.messagesInterval !== undefined) {
      clearInterval(this.messagesInterval)
      this.messagesInterval = undefined
    }
  },
  watch: {
    userOrGroup: function (val) {
      if (this.messagesInterval !== undefined) {
        clearInterval(this.messagesInterval)
        this.messagesInterval = undefined
      }
      if (val === undefined) {
        this.messages = []
        return
      }
      this.update(val.id)
      this.messagesInterval = setInterval(() => { this.update(val.id) }, 5000)
    }
  },
  computed: {
    sortedMessages: function () {
      const data = []
      let tmp = []
      let last
      this.messages.forEach(message => {
        if (last !== undefined && last.user !== message.user) {
          data.push(tmp)
          tmp = []
        }
        last = message
        tmp.push(message)
      })
      if (tmp.length > 0) {
        data.push(tmp)
      }
      return data
    },
    isAUser: function () { return this.userOrGroup.pseudo !== undefined }
  },
  methods: {
    isTheUser: function (id) { return this.$store.getters.getUser.id === id },
    sendMessage: function () {
      if (this.userOrGroup === undefined) {
        return
      }
      if (this.isAUser) {
        this.$store.dispatch('addMessage', { id: this.userOrGroup.id, data: { text: this.message } }).then((data) => {
          this.message = ''
          this.update(this.userOrGroup.id)
        })
      } else {
        this.$store.dispatch('addMessageGroups', { id: this.userOrGroup.id, data: { text: this.message } }).then((data) => {
          this.message = ''
          this.update(this.userOrGroup.id)
        })
      }
    },
    update: function (id) {
      if (this.isAUser) {
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
      } else {
        this.$store.dispatch('getMessagesGroups', id).then((data) => {
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
}
</script>

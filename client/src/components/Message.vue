<template>
  <div class='d-flex'>
    <v-card max-width="60%" :class="'mb-1' + (message.user1 === $store.getters.getUser.id ? ' ml-auto' : '')" :color="message.user1 === $store.getters.getUser.id ? 'primary' : ''">
      <v-card-text :class="message.user1 === $store.getters.getUser.id ? 'white--text' : 'black--text'" v-html="message.data.text"></v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div class='d-flex'>
    <v-card max-width="60%" :class="'mb-1' + (isTheUser ? ' ml-auto' : '')" :color="isTheUser ? 'primary' : ''">
      <v-card-text :class="isTheUser ? 'white--text' : 'black--text'" v-html="message.text"></v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    },
    isTheUser: {
      type: Boolean
    }
  }
}
</script>

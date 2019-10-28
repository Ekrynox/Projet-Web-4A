<template>
  <div :class="message.user1 === $store.getters.getUser.id && 'ml-auto'">
    <v-chip class="mb-1" :color="message.user1 === $store.getters.getUser.id ? 'primary' : ''">
      {{ message.data.text }}
    </v-chip>
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

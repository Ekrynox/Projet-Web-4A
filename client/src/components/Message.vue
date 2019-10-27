<template>
  <p>{{ message }}</p>
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

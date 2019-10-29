<template>
    <v-dialog v-model="dialog" max-width="fit-content">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="$store.dispatch('logout')">Logout</v-btn>
          <v-btn color="primary" text @click="dialog = false">Close</v-btn>
          <v-btn color="success" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  model: {
    prop: 'open',
    event: 'close'
  },
  props: {
    open: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      dialog: false
    }
  },
  mounted: function () {
    this.dialog = this.open
  },
  watch: {
    open: function (val) {
      this.dialog = val
    },
    dialog: function (val, oldVal) {
      val !== oldVal && this.$emit('close', val)
    }
  }
}
</script>

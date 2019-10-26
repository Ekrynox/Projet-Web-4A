<template>
  <v-card class="fill-height" tile>
    <v-list>
      <v-list-item-group v-model="user" color="primary">
        <v-list-item v-for="user in users" :key="user.id">
          <v-list-item-content>
            <v-list-item-title v-text="user.pseudo" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      default: function () { return [] }
    }
  },
  data: function () {
    return {
      user: ''
    }
  }
}
</script>

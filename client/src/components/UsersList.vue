<template>
  <v-card height="100%" max-height="100%" tile>
    <v-list>
      <v-list-item-group v-model="user" color="primary">
        <v-list-item v-for="(user, i) in users" :key="i" :value="user">
          <v-list-item-content>
            <v-list-item-title v-text="user.pseudo" />
          </v-list-item-content>

          <v-list-item-icon v-if="!$store.getters.isFriend(user.id) && $store.getters.getUser.id !== user.id">
            <v-btn text icon color="success" @click="$store.dispatch('addFriend', user.id)">
              <v-icon>mdi-account-plus</v-icon>
            </v-btn>
          </v-list-item-icon>

          <v-list-item-icon v-if="$store.getters.isFriend(user.id) && $store.getters.getUser.id !== user.id">
            <v-btn text icon color="error" @click="$store.dispatch('removeFriend', user.id)">
              <v-icon>mdi-account-minus</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  model: {
    prop: 'user',
    event: 'change'
  },
  props: {
    users: {
      type: Array,
      default: function () { return [] }
    }
  },
  data: function () {
    return {
      user: undefined
    }
  },
  watch: {
    users: function (val) {
      this.user = undefined
    },
    user: function (val) {
      this.$emit('change', val)
    }
  }
}
</script>

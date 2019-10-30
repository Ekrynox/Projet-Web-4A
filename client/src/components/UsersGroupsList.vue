<template>
  <v-card height="100%" max-height="100%" tile>
    <v-list class="pa-0">
      <v-list-item-group v-model="selected" color="primary">
        <template v-for="(item, i) in items">
          <v-list-item :key="i" :value="item">
            <v-list-item-content>
              <v-list-item-title v-html="getTitle(item)" />
            </v-list-item-content>

            <v-list-item-icon class="ma-0 my-auto" v-if="isAUser(item) && !isTheUser(item.id) && !isFriend(item.id)">
              <v-btn text icon color="success" @click="$store.dispatch('addFriend', item.id)">
                <v-icon>mdi-account-plus</v-icon>
              </v-btn>
            </v-list-item-icon>

            <v-list-item-icon class="ma-0 my-auto" v-if="isAUser(item) && !isTheUser(item.id) && isFriend(item.id)">
              <v-btn text icon color="error" @click="$store.dispatch('removeFriend', item.id)">
                <v-icon>mdi-account-minus</v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
          <v-divider inset :key="'divider' + i"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  model: {
    prop: 'selected',
    event: 'change'
  },
  props: {
    items: {
      type: Array,
      default: function () { return [] }
    }
  },
  data: function () {
    return {
      selected: undefined
    }
  },
  computed: {
    ...mapGetters({
      isFriend: 'isFriend'
    })
  },
  methods: {
    isTheUser: function (id) { return this.$store.getters.getUser.id === id },
    isAUser: (item) => item.pseudo !== undefined,
    getTitle: (item) => item.pseudo || item.name
  },
  watch: {
    items: function (val) {
      if (this.selected === undefined) {
        return
      }
      this.selected = val.find((selected) => this.isAUser(selected) === this.isAUser(this.selected) && selected.id === this.selected.id)
    },
    selected: function (val, oldVal) {
      if (val === undefined && oldVal === undefined) {
        return
      }
      if (val === undefined ^ oldVal === undefined) {
        this.$emit('change', val)
        return
      }
      if (val.id !== oldVal.id) {
        this.$emit('change', val)
      }
    }
  }
}
</script>

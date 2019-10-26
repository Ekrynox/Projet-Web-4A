<template>
  <v-row class="fill-height">
    <v-col :cols="3" class="d-flex flex-column">
      <v-text-field prepend-inner-icon="mdi-magnify" label="Search..." solo />
      <UsersList/>
    </v-col>
    <v-col :cols="9">
      <MessagesList />
    </v-col>
  </v-row>
</template>

<script>
import UsersList from '../UsersList'
import MessagesList from '../MessagesList'

export default {
  components: { UsersList, MessagesList }
}
</script>

<template>
  <v-row>
    <v-col>
      <Profile/>
    </v-col>
  </v-row>
</template>

<script>
import Profile from '@/components/Profile.vue'

export default {
  components: {
    Profile,
  },
  name: 'Account',
  data() {
    return {}
  }
}
</script>
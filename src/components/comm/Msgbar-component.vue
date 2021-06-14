<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    :color="color"
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        dark
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  name: 'MsgbarComponent',
  data() {
    return {}
  },
  computed: {
    snackbar: {
      get() {
        return this.$store.getters['msg/display'];
      },
      set(val) {
        this.$store.commit('msg/setDisplay', val);
      },
    },
    text() {
      return this.$store.getters['msg/msg'];
    },
    timeout() {
      return this.$store.getters['msg/timeout'];
    },
    color() {
      return this.$store.getters['msg/color'];
    }
  }
}
</script>
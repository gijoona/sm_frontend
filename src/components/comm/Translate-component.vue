<template>
  <span>{{ text }}</span>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TranslateComponent',
  data() {
    return {
      text: '',
      slot: {}
    }
  },
  watch: {
    slot: {
      deep: true,
      handler() {
        this.getText();
      }
    },
    langs: {
      deep: true,
      immediate: true,
      handler() {
        this.getText();
      }
    }
  },
  computed: {
    ...mapGetters({
      langs: 'lang/langs'
    }),
    code() {
      return this.slot.text;
    }
  },
  methods: {
    getText() {
      this.$store.dispatch('lang/getText', this.code)
                .then(res => {
                  this.text = res;
                });
    }
  },
  created() {
    const [ slot ] = this.$slots.default;
    this.slot = slot;
  },
  updated() {
    const [ slot ] = this.$slots.default;
    this.slot = slot;
  }
}
</script>
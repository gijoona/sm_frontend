<template>
  <span>{{ text }}</span>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TranslateComponent',
  data() {
    return {
      code: '',
      text: ''
    }
  },
  watch: {
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
    })
  },
  methods: {
    getText() {
      const [ slot ] = this.$slots.default;
      this.code = slot.text;
      this.$store.dispatch('lang/getText', this.code)
                .then(res => {
                  this.text = res;
                });
    }
  }
}
</script>
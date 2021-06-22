<template>
  <span>{{ getText() }}</span>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TranslateComponent',
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      langs: 'lang/langs'
    })
  },
  methods: {
    getText() {
      const [ slot ] = this.$slots.default;
      const word = this.langs.find(lang => lang.code === slot.text);
      console.log(word);
      return word ? word.text : slot.text;
    }
  }
}
</script>
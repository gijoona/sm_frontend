<template>
  <span>
    {{ currency() }} 원
  </span>
</template>
<script>
export default {
  name: "CurrencyComponent",
  data() {
    return {
      show: false
    }
  },
  methods: {
    currency() {
      const [ slot1 ] = this.$slots.default;
      return slot1.text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
}
</script>
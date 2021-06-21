<template>
  <v-row>
    <v-col
      class="d-flex align-center justify-end"
      lg="5"
    >
      합계 : <CurrencyComponent>{{ amount }}</CurrencyComponent>
    </v-col>
    <v-col
      lg="7"
      class="pl-7"
    >
      <v-text-field
        v-model="quantity"
        outlined
        hide-details
        prepend-inner-icon="mdi-minus"
        append-icon="mdi-plus"
        append-outer-icon="mdi-cart-plus"
        style="text-align: right;" 
        @click:prepend-inner.stop="decrement"
        @click:append.stop="increment"
        @click:append-outer.stop="onAdd"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
<script>
import CurrencyComponent from './../../comm/Currency-component.vue'

export default {
  components: {
    CurrencyComponent
  },
  props: [ 'item' ],
  name: 'QuantityComponent',
  data() {
    return {
      quantity: 1
    }
  },
  computed: {
    amount() {
      return this.item.buyPrice * this.quantity;
    }
  },
  methods: {
    increment() {
      this.quantity++;
    },
    decrement() {
      if (this.quantity > 1) this.quantity--;
    },
    onAdd() {
      this.$emit('onAdd', this.quantity);
    }
  }
}
</script>
<template>
  <v-row>
    <v-col>
      <v-data-table
        :headers="headers"
        :items="items"
        item-key="code"
        :page="pageNum"
        :items-per-page="limit"
        :server-items-length="total"
        :loading="loading"
        class="elevation-1"
        @update:page="updatePage"
        disable-sort
      >
        <template v-slot:item.actions="{ item }">
          <v-icon 
            small
            @click="addCart(item)"
          >mdi-cart</v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ['items'],
  name: 'TableContents',
  data() {
    return {
      headers: [
        { text: 'CODE', value: 'code' },
        { text: 'DESCRIPTION', value: 'description' },
        { text: 'UNIT', value: 'unit' },
        { text: 'PRICE', value: 'buyPrice' },
        { text: 'ACTIONS', value: 'actions', sortable: false}
      ]
    }
  },
  computed: {
    pageNum() {
      return this.$store.getters['item/pageNum'] + 1;
    },
    limit() {
      return this.$store.getters['item/limit'];
    },
    total() {
      return this.$store.getters['item/total'];
    },
    loading() {
      return this.$store.getters['item/loading'];
    }
  },
  methods: {
    updatePage(pageNum) {
      this.$store.commit('item/setPageNum', pageNum - 1);
      this.$emit('changePage');
    },
    addCart(item) {
      this.$emit('addCart', item);
    }
  }
}
</script>
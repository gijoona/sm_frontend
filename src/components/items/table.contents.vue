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
      // TODO :: 0001로 조회 시 paging에 문제가 있음. 2페이지로 갔다가 1페이지로 돌아오는게 안됨.
      this.$store.commit('item/setPageNum', pageNum - 1);
      this.$emit("changePage");
    }
  }
}
</script>
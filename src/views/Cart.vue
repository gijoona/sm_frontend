<template>
  <v-row>
    <v-col>
      <v-data-table
        :headers="headers"
        :items="carts"
        item-key="id"
        :page="pageNum"
        :items-per-page="limit"
        :server-items-length="total"
        :loading="loading"
        class="elevation-1"
        disable-sort
        @update:page="updatePage"
      >
        <template v-slot:item.item.pig="{ item }">
          <v-avatar
            tile
            size="72px"
            class="mt-2 mb-2"
          >
            <ImageComponent v-if="item.item.pig"
              :path="item.item.pig"
            />
            <v-icon v-else
              size="48"
            >fa-camera</v-icon>
          </v-avatar>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>
<script>
import ImageComponent from '@/components/comm/Img-component.vue'

export default {
  components: {
    ImageComponent
  },
  name: 'Cart',
  data() {
    return {
      headers: [
        { text: 'PIG', value: 'item.pig', width:'5%', divider: true, sortable: false },
        { text: 'CODE', value: 'item.code', sortable: false },
        { text: 'NAME', value: 'item.nameKor', sortable: false },
        { text: 'UNIT', value: 'item.unit', sortable: false },
        { text: 'PRICE', value: 'item.buyPrice', sortable: false },
        { text: 'MARKER', value: 'item.marker', sortable: false },
        { text: 'QTY', value: 'quantity', sortable: false },
      ]
    }
  },
  computed: {
    carts() {
      return this.$store.getters['cart/carts'];
    },
    userinfo() {
      return this.$store.getters['user/userinfo'];
    },
    pageNum() {
      return this.$store.getters['cart/pageNum'] + 1;
    },
    limit() {
      return this.$store.getters['cart/limit'];
    },
    total() {
      return this.$store.getters['cart/total'];
    },
    loading() {
      return this.$store.getters['cart/loading'];
    },
  },
  methods: {
    getCartList() {
      this.$store.dispatch('cart/findAll', this.userinfo.id);
    },
    updatePage(pageNum) {
      this.$store.commit('cart/setPageNum', pageNum - 1);
      this.changePage();
    },
    changePage() {
      this.$store.dispatch('cart/searchCarts', { id: this.userinfo.id, searchTxt: this.searchTxt });
      setInterval(() => { if (this.$store.getters["cart/loading"]) this.$store.commit('cart/disableLoading') }, 5000)
    },
  },
  mounted() {
    this.getCartList();
  }
}
</script>
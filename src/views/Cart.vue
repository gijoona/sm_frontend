<template>
  <v-row>
    <v-col>
      <v-data-table
        v-model="selected"
        show-select
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
        <template v-slot:item.quantity="props">
          <v-edit-dialog
            large
            persistent
            @save="save(props.item)"
            @open="open(props.item)"
          >
            <div>{{ props.item.quantity }}</div>
            <template v-slot:input>
              <div class="mt-4 text-h6">
                Update Quantity
              </div>
              <v-text-field
                v-model="editedItem.quantity"
                :rules="[max25chars]"
                label="Edit"
                single-line
                counter
                autofocus
              ></v-text-field>
            </template>
          </v-edit-dialog>
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
      ],
      selected: [],
      max25chars: v => v.length <= 25 || 'Input too long!',
      editedItem: {}
    }
  },
  computed: {
    carts() {
      return this.$store.getters['cart/carts'];
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
      this.$store.dispatch('cart/findAll');
    },
    updatePage(pageNum) {
      this.$store.commit('cart/setPageNum', pageNum - 1);
      this.changePage();
    },
    changePage() {
      this.$store.dispatch('cart/searchCarts', { searchTxt: this.searchTxt });
      setInterval(() => { if (this.$store.getters["cart/loading"]) this.$store.commit('cart/disableLoading') }, 5000)
    },
    open(item) {
      this.editedItem = {...item};
    },
    save() {
      this.$store.commit('cart/updateCart', this.editedItem);
    }
  },
  mounted() {
    this.getCartList();
  }
}
</script>
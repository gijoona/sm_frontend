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
        hide-default-header
        disable-sort
        @update:page="updatePage"
        @update:items-per-page="updateLimit"
      >
        <template v-slot:header="{ isMobile, props: { headers } }">
          <v-data-table-header
            v-if="!isMobile"
            :headers="headers"
          ></v-data-table-header>
        </template>
        <template v-slot:item.pig="{ item }">
          <v-avatar
            tile
            size="72px"
            class="mt-2 mb-2"
          >
            <ImgComponent
              :path="item.pig"
            />
          </v-avatar>
        </template>
        <template v-slot:item.contents="{ item }">
          <v-card
            color="transparent"
            class="elevation-0"
            @click="showDetail(item)"
          >
            <v-card-subtitle
              class="pt-1 pb-0 pl-1"
            >
              [{{ item.code }}]
            </v-card-subtitle>
            <v-card-title
              class="pt-0 pl-1"
            >{{ item.nameKor }}
            </v-card-title>
            <v-card-subtitle
              class="pb-0 pl-1"
            >
              UNIT : {{ item.unit }} /
              PRICE : <CurrencyComponent>{{ item.buyPrice }}</CurrencyComponent>
            </v-card-subtitle>
          </v-card>
        </template>
        <template v-slot:item.quantity="{ item }">
          <QuantityComponent
            :item="item"
            @onAdd="(data) => onAdd(data, item)" 
          />
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>
<script>
import QuantityComponent from './Quantity-component.vue'

export default {
  components: {
    QuantityComponent
  },
  props: ['items'],
  name: 'TableContents',
  data() {
    return {
      headers: [
        { text: 'THUMBNAIL', value: 'pig', width:'5%',  divider: true, sortable: false },
        { text: 'CONTENTS', value: 'contents', width: '60%', sortable: false },
        { text: 'QUANTITY', value: 'quantity', align: 'center', sortable: false },
      ],
      dialog: false,
      selecteditem: {}
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
    },
  },
  methods: {
    updatePage(pageNum) {
      this.$store.commit('item/setPageNum', pageNum - 1);
      this.$emit('changePage');
    },
    updateLimit(limit) {
      this.$store.commit('item/setLimit', limit);
      this.$emit('changePage');
    },
    onAdd(data, item) {
      this.$emit('onAdd', { ...{ quantity: data }, ...item });
    },
    showDetail(item) {
      this.$store.commit('item/visibleDetail', item);
    }
  }
}
</script>
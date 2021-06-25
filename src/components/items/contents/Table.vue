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
        disable-sort
        @update:page="updatePage"
        @update:items-per-page="updateLimit"
      >
        <!-- Headers -->
        <template v-slot:header.pig="{ header }">
          <TranslateComponent>{{ header.text }}</TranslateComponent>
        </template>
        <template v-slot:header.contents="{ header }">
          <TranslateComponent>{{ header.text }}</TranslateComponent>
        </template>
        <template v-slot:header.quantity="{ header }">
          <TranslateComponent>{{ header.text }}</TranslateComponent>
        </template>
        <!-- Headers -->

        <!-- Bodys -->
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
            >
              <span v-if="langType === 'KOR'">
                {{ item.nameKor }}
              </span>
              <span v-else>
                {{ item.nameEng }}
              </span>
            </v-card-title>
            <v-card-subtitle
              class="pb-0 pl-1"
            >
              <TranslateComponent>UNIT</TranslateComponent> : {{ item.unit }} /
              <TranslateComponent>PRICE</TranslateComponent> : <CurrencyComponent>{{ item.buyPrice }}</CurrencyComponent>
            </v-card-subtitle>
          </v-card>
        </template>
        <template v-slot:item.quantity="{ item }">
          <QuantityComponent
            :item="item"
            @onAdd="(data) => onAdd(data, item)" 
          />
        </template>
        <!-- Bodys -->

      </v-data-table>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex'
import QuantityComponent from './Quantity-component.vue'

export default {
  components: {
    QuantityComponent,
  },
  props: ['items'],
  name: 'TableContents',
  data() {
    return {
      headers: [
        { text: 'THUMBNAIL', value: 'pig', width:'5%', align: 'center',  divider: true, sortable: false },
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
    ...mapGetters({
      limit:'item/limit',
      total: 'item/total',
      loading: 'item/loading',
      langType: 'lang/type'
    })
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
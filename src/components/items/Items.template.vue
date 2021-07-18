<template>
  <div>
    <v-card
      color="indigo"
      class="d-flex mb-2"
      tile
    >
      <v-card-text>
        <v-row>
          <v-col>
            <v-btn
              dark
              text
              class="text-h6 font-weight-black"
            >
              <v-icon>mdi-chevron-right</v-icon>
              <label>{{ categoryName }}</label>
            </v-btn>
          </v-col>
          <v-col class="ml-auto" sm="7" md="5" lg="3">
            <v-text-field
              v-model="searchTxt"
              label="Search"
              placeholder="코드번호, 주요단어"
              dense
              single-line
              solo
              hide-details
              append-icon="fa-search"
              @click:append="search"
              @keydown.enter="search"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <section v-if="isCardView">
      <CardContents :items="items" @scrollEnd="loadItems" @onAdd="addCartItem"/>
    </section>
    <section v-else>
      <TableContents :items="items" @changePage="loadItems"  @onAdd="addCartItem"/>
    </section>
    <DetailPop @onAdd="addCartItem"/>
  </div>
</template>
<script>
import CardContents from '@/components/items/contents/Card'
import TableContents from '@/components/items/contents/Table'
import DetailPop from '@/components/items/contents/Detail-pop.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    CardContents,
    TableContents,
    DetailPop
  },
  name: 'Items',
  data() {
    return {
      searchTxt: '',
      dialog: true
    }
  },
  watch:{
    categoryName() {
      this.initPage();
    }
  },
  computed: {
    ...mapGetters({
      categoryName: 'category/name',
      items: 'item/items',
      loading: 'item/loading',
      isCardView: 'item/isCardView'
    })
  },
  methods: {
    findAll() {
      this.$store.dispatch('item/findAll');
    },
    search() {
      this.$store.commit('item/resetPagination');
      this.$store.dispatch('item/search', { searchTxt: this.searchTxt });
    },
    loadItems() {
      this.$store.dispatch('item/searchItems', { searchTxt: this.searchTxt });
      setInterval(() => { if (this.$store.getters["item/loading"]) this.$store.commit('item/disableLoading') }, 5000)
    },
    addCartItem(item) {
      this.$store.dispatch('cart/addCartItem', item);
    },
    initPage() {
      this.searchTxt = '';
      this.$store.commit('item/resetPagination');
      this.findAll();
    },
    viewChange() {
      this.$store.commit('item/toggleIsCardView');
    },
    onResize () {
      this.$store.commit('item/setIsCardView', window.innerWidth < 600);
    },
  },
  beforeDestroy () {
    if (typeof window === 'undefined') return

    window.removeEventListener('resize', this.onResize, { passive: true })
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
   
    this.initPage();
  }
}
</script>
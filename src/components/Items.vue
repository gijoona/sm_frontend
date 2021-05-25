<template>
  <div
    v-scroll="handleScroll"
  >

    <v-dialog
      v-model="loading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

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
              <v-label>{{ this.$store.state.category.name }}</v-label>
            </v-btn>
          </v-col>
          <v-col class="ml-auto" sm="12" md="5" lg="3">
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

    <v-row>
      <v-col 
        v-for="item in items" :key="item.code"
        sm="12" md="4" lg="3"
      >
        <v-dialog
          transition="dialog-bottom-transition"
          max-width="800"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-card
              v-bind="attrs"
              v-on="on"
              min-height="460"
            >
              <v-img 
                height="250"
                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
              ></v-img>
              <v-card-title>{{ item.nameKor }}</v-card-title>

              <v-divider class="mx-4"></v-divider>

              <v-card-text>
                <div>코드번호 : {{ item.code }}</div>
                <div>단위 : {{ item.unit }}</div>
                <div>가격(WON) : {{ item.buyPrice }}</div>
              </v-card-text>

              <v-divider class="mx-2"></v-divider>
              <v-card-actions>
                <v-btn
                  block
                  color="indigo"
                  @click.stop="addCart"
                >
                  Add Cart
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar
                color="indigo"
                dark
                tile
                class="text-h6"
              >{{ item.nameKor }}</v-toolbar>

              <v-img 
                height="250"
                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
              ></v-img>
              <v-card-title>{{ item.nameKor }}</v-card-title>

              <v-divider class="mx-4"></v-divider>

              <v-card-text>
                <div>{{ item.description }}</div>
                <div>코드번호 : {{ item.code }}</div>
                <div>단위 : {{ item.unit }}</div>
                <div>가격(WON) : {{ item.buyPrice }}</div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  color="indigo"
                  @click.stop="addCart"
                >
                  Add Cart
                </v-btn>
                <v-btn
                  text
                  @click="dialog.value = false"
                >Close</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Vue from 'vue'

// scroll directive
Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

export default {
  name: 'Items',
  data() {
    return {
      searchTxt: '',
      dialog: true,
      loading: false
    }
  },
  watch:{
    categoryCode() {
      this.initPage();
    }
  },
  computed: {
    categoryCode() {
      return this.$store.state.category.code;
    },
    items() {
      return this.$store.getters['item/items'];
    }
  },
  methods: {
    handleScroll() {
      const scrollPos = window.scrollMaxY - window.scrollY;
      if (100 > scrollPos) {
        this.loading = true;
        setInterval(() => { if (this.loading) this.loading = false }, 5000)
        this.$store.dispatch('item/nextPage', { categoryCode: this.categoryCode, searchTxt: this.searchTxt });
      }
    },
    findAll() {
      this.$store.dispatch('item/findAll', { categoryCode: this.categoryCode }).then(() => this.loading = false);
    },
    search() {
      this.loading = true;
      this.$store.commit('item/resetCount');
      this.$store.commit('item/resetPageNum');
      this.$store.commit('item/resetItems');
      this.$store.dispatch('item/search', { categoryCode: this.categoryCode, searchTxt: this.searchTxt }).then(() => this.loading = false);
    },
    addCart() {
      alert('added Cart')
    },
    initPage() {
      this.loading = true;
      this.searchTxt = '';
      this.$store.commit('item/resetCount');
      this.$store.commit('item/resetPageNum');
      this.$store.commit('item/resetItems');
      this.findAll();
    }
  },
  mounted() {
    this.initPage();
  }
}
</script>
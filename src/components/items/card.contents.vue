<template>
  <v-row
    v-scroll="handleScroll"
  >
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
  props: ['items'],
  name: 'CardContents',
  data() {
    return {}
  },
  methods: {
    handleScroll(evt) {
      let scrollPos = 0;
      if (window.scrollMaxY) scrollPos = window.scrollMaxY - window.scrollY;
      else scrollPos = (evt.target.scrollingElement.offsetHeight - screen.height) - window.scrollY;

      if (100 > scrollPos) {
        this.$store.commit('item/incrementPageNum');
        this.$emit('scrollEnd');
      }
    },
  }
}
</script>
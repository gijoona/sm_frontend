<template>
  <v-row
    v-scroll="handleScroll"
  >
    <v-col 
      v-for="item in items" :key="item.code"
      sm="12" md="4" lg="3"
    >
      <v-card
        min-height="460"
        @click="showDetail(item)"
      >
        <ImgComponent
          contain
          min-width="250"
          height="250"
          :path="item.pig"
        ></ImgComponent>

        <v-card-title>
          <span v-if="langType === 'KOR'">
            {{ item.nameKor }}
          </span>
          <span v-else>
            {{ item.nameEng }}
          </span>
        </v-card-title>

        <v-divider class="mx-4"></v-divider>

        <v-card-text>
          <div><TranslateComponent>CODE</TranslateComponent> : {{ item.code }}</div>
          <div><TranslateComponent>UNIT</TranslateComponent> : {{ item.unit }}</div>
          <div><TranslateComponent>PRICE</TranslateComponent> : <CurrencyComponent>{{ item.buyPrice }}</CurrencyComponent></div>
        </v-card-text>

        <v-divider class="mx-2"></v-divider>
        <v-card-actions>
          <v-btn
            dark
            block
            color="indigo"
            @click.stop="onAdd(item)"
          >
            <TranslateComponent>ADD_CART</TranslateComponent>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters({
      langType: 'lang/type'
    })
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
    showDetail(item) {
      this.$store.commit('item/visibleDetail', item);
    },
    onAdd(item) {
      this.$emit('onAdd', item);
    },
  }
}
</script>
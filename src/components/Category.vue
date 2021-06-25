<template>
  <v-card>
    <v-list
      nav
      dense
    >
      <v-list-group
        :value="true"
      >
        <template v-slot:activator>
          <v-list-item>
            <TranslateComponent>CATEGORY</TranslateComponent> 
            <TranslateComponent
              class="ml-1"
            >LIST</TranslateComponent>
          </v-list-item>
        </template>

        <v-list-item-group
          v-model="selectedItem"
        >
          <template v-for="category in categorys">
            <v-list-item 
              :key="category.code"
              link
              class="my-1"
              @click="selectedCategory(category)"
            >
              <template v-slot:default="{ active }">
                <v-list-item-icon
                  class="mx-3"
                >
                  <v-icon v-if="active">mdi-chevron-right</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title 
                    v-if="langType === 'KOR'"
                    v-text="`${category.code}. ${category.nameKor}`"
                  ></v-list-item-title>
                  <v-list-item-title 
                    v-else
                    v-text="`${category.code}. ${category.nameEng}`"
                  ></v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>

            <v-divider 
              :key="category.nameKor"
              class="mx-4"
            ></v-divider>
          </template>
        </v-list-item-group>
      </v-list-group>
    </v-list>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Categorys',
  data() {
    return {
      selectedItem: 0,
      category: ''
    }
  },
  computed:{
    ...mapGetters({
      categorys: 'category/categorys',
      langType: 'lang/type'
    })
  },
  methods: {
    findAll() {
      this.$store.dispatch('category/findAll');
    },
    selectedCategory(category) {
      this.$store.commit("category/setCategoryCode", category.code);
      this.$store.commit("category/setCategoryName", category.nameKor);
    }
  },
  mounted() {
    this.findAll()
  }
}
</script>
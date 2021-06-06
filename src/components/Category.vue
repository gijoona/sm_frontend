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
          <v-list-item>Category List</v-list-item>
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
                  <!-- <v-icon v-else>mdi-circle</v-icon> -->
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="`${category.code}. ${category.nameKor}`"></v-list-item-title>
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
export default {
  name: 'Categorys',
  data() {
    return {
      selectedItem: 0,
      category: '',
      categorys: []
    }
  },
  methods: {
    findAll() {
      return this.$http
                    .get('http://ec2-3-12-199-144.us-east-2.compute.amazonaws.com:5000/category/findAll')
                    // .get('http://172.21.13.235:5000/category/findAll')
                    .then(res => {
                      if (res.data.length > 0) this.categorys = res.data
                    })
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
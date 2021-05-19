<template>
  <div class="items">
    <h1>This is an items page</h1>
    <v-list>
      <v-list-group
        :value="true"
      >
        <template v-slot:activator>
          <v-list-item>Category List</v-list-item>
        </template>

        <v-list-item 
          v-for="category in categorys" :key="category.category"
          link
        >
          <v-list-item-title v-text="`${category.category}. ${category.name}`"></v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>
<script>
export default ({
  name: 'Prices',
  data: () => {
    return {
      categorys: []
    }
  },
  methods: {
    findAll() {
      return this.$http
                    .get('http://localhost:5000/category/findAll')
                    .then(res => {
                      if (res.data.length > 0) this.categorys = res.data
                    })
    }
  },
  mounted() {
    this.findAll()
  }
})
</script>

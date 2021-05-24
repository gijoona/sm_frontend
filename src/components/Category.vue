<template>
  <v-card>
    <v-list>
      <v-list-group
        :value="true"
      >
        <template v-slot:activator>
          <v-list-item>Category List</v-list-item>
        </template>

        <template v-for="category in categorys">
          <v-list-item 
            :key="category.nameKor"
            link
          >
            <v-list-item-title v-text="`${category.code}. ${category.nameKor}`"></v-list-item-title>
          </v-list-item>

          <v-divider 
            :key="category.code"
            class="mx-4"
          ></v-divider>
        </template>
      </v-list-group>
    </v-list>
  </v-card>
</template>
<script>
export default {
  name: 'Categorys',
  data() {
    return {
      categorys: []
    }
  },
  methods: {
    findAll() {
      return this.$http
                    // .get('http://ec2-3-12-199-144.us-east-2.compute.amazonaws.com:5000/category/findAll')
                    .get('http://localhost:5000/category/findAll')
                    .then(res => {
                      if (res.data.length > 0) this.categorys = res.data
                    })
    }
  },
  mounted() {
    this.findAll()
  }
}
</script>
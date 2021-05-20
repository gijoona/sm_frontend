<template>
  <div>
    <v-card
      color="indigo"
      class="d-flex mb-2"
      tile
    >
      <v-card-text>
        <v-row>
          <v-col class="ml-auto" sm="12" md="5" lg="3">
            <v-text-field
              label="Search"
              placeholder="코드번호, 주요단어"
              dense
              single-line
              solo
              hide-details
              append-icon="fa-search"
              @click:append="search"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    
    <v-row>
      <v-col v-for="item in items" :key="item.code">
        <v-card
          min-height="460"
        >
          <v-img 
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>
          <v-card-title>{{ item.name }}</v-card-title>

          <v-divider class="mx-4"></v-divider>

          <v-card-text>
            <div>코드번호 : {{ item.code }}</div>
            <div>단위 : {{ item.unit }}</div>
            <div>가격(WON) : {{ item.price }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'Items',
  data() {
    return {
      items: []
    }
  },
  methods: {
    findAll() {
      return this.$http
                  .get('http://localhost:5000/items/findAll')
                  .then(res => {
                    if(res.data.length > 0) this.items = res.data
                  })
    },
    search() {
      alert('search')
    }
  },
  mounted() {
    this.findAll();
  }
}
</script>
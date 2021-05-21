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
              <v-card-title>{{ item.name }}</v-card-title>

              <v-divider class="mx-4"></v-divider>

              <v-card-text>
                <div>코드번호 : {{ item.code }}</div>
                <div>단위 : {{ item.unit }}</div>
                <div>가격(WON) : {{ item.price }}</div>
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
              >{{ item.name }}</v-toolbar>

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
                  .get('http://ec2-3-12-199-144.us-east-2.compute.amazonaws.com:5000/items/findAll')
                  .then(res => {
                    if(res.data.length > 0) this.items = res.data
                  })
    },
    search() {
      alert('search')
    },
    addCart() {
      alert('added Cart')
    }
  },
  mounted() {
    this.findAll();
  }
}
</script>
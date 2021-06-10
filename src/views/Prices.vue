<template>
  <div class="items">
    <v-row>
      <v-col cols="12" xs="12" sm="4" md="3" lg="2">
        <Category />
      </v-col>
      <v-col cols="12" xs="12" sm="8" md="7" lg="8">
        <Items />
      </v-col>
      <v-col md="2" lg="2">
        <v-card
          color="grey"
          height="800"
          class="hidden-sm-and-down"
        ></v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Category from '@/components/Category.vue'
import Items from '@/components/items/Items.template.vue'

export default {
  name: 'Prices',
  data: () => {
    return {}
  },
  components: {
    Category,
    Items
  }
  // TODO :: Itmes View 변경 버튼
}
</script>

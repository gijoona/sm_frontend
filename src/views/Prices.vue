<template>
  <div class="items">
    <v-row>
      <v-col cols="12" xs="12" sm="4" md="3" lg="2">
        <Category />
      </v-col>
      <v-col cols="12" xs="12" sm="8" md="9" lg="10">
        <Items />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Category from '@/components/Category.vue'
import Items from '@/components/items/Items.vue'

export default {
  name: 'Prices',
  data: () => {
    return {}
  },
  components: {
    Category,
    Items
  }
}
</script>

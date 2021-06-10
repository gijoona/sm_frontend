<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
  >
    <v-card
      color="#FAFAF0"
    >

      <v-img v-if="item.pig"
        contain
        max-height="400"
        :src="thumbnail(item)"
      ></v-img>
      <v-img v-else
        contain
        max-height="400"
        src="@/assets/photo_1280.png"
      ></v-img>

      <v-card-text>
        <v-subheader
          class="text-overline font-weight-black"
        >Product information</v-subheader>

        <v-divider></v-divider>

        <v-container
          class="text-overline font-weight-black"
        >
          <v-row>
            <v-col md="4">Category</v-col>
            <v-col md="8">{{ item.categoryCode }}</v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col md="4">Code</v-col>
            <v-col md="8">{{ item.code }}</v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col md="4">Name</v-col>
            <v-col md="8">{{ item.nameKor }}</v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col md="4">Unit</v-col>
            <v-col md="8">{{ item.unit }}</v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col md="4">Price</v-col>
            <v-col md="8">{{ item.buyPrice }}</v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col md="4">Marker</v-col>
            <v-col md="8">{{ item.marker }}</v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-end">
        <v-btn
          dark
          color="indigo"
          @click.stop="addCart"
        >
          Add Cart
        </v-btn>
        <v-btn
          text
          @click="onClose"
        >Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'DetailPop',
  data() {
    return {
      minHeight: 460
    }
  },
  computed: {
    dialog: {
      get() {
        return this.$store.getters['item/isShowDialog'];
      },
      set() {
        return this.$store.commit('item/hideDetail');
      }
    },
    item() {
      return this.$store.getters['item/selectedItem'];
    }
  },
  methods: {
    onAdd(item) {
      this.$emit('addCart', item);
    },
    onClose() {
      this.$store.commit('item/hideDetail');
    },
    thumbnail(item) {
      return item.pig && require('@/assets/images' + item.pig)
    }
  }
}
</script>
<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
  >
    <v-card
      color="#FAFAF0"
    >

      <ImageComponent
        contain
        max-height="400"
        :path="item.pig"
      ></ImageComponent>

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

      <v-card-actions>
        <v-row class="ma-0">
          <v-col 
            cols="12"
            sm="6"
            md="3"
            class="d-flex align-center justify-center"
          >
            <v-text-field
              v-model="quantity"
              dense
              hide-details
              prepend-inner-icon="mdi-minus"
              append-icon="mdi-plus"
              @click:prepend-inner.stop="decrement"
              @click:append.stop="increment"
            >
            </v-text-field>
          </v-col>

          <v-spacer></v-spacer>

          <v-col
            cols="12"
            sm="6"
            md="4"
            class="d-flex align-center justify-end font-weight-bold"
          >
            합계 : {{ amount }} 원
          </v-col>

          <v-col 
            cols="12"
            sm="12"
            md="4"
            class="d-flex justify-end"
          >
            <v-btn
              dark
              color="indigo"
              @click.stop="onAdd"
            >
              Add Cart
            </v-btn>
            <v-btn
              text
              @click="onClose"
            >Close</v-btn>
          </v-col>
        </v-row>


      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import ImageComponent from './../../comm/Img-component.vue'

export default {
  components: {
    ImageComponent
  },
  name: 'DetailPop',
  data() {
    return {
      minHeight: 460,
      quantity: 1
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
    },
    amount() {
      return this.item.buyPrice * this.quantity || 0;
    }
  },
  methods: {
    onAdd() {
      this.$emit('onAdd', { ...{ quantity: this.quantity }, ...(this.item) });
    },
    onClose() {
      this.$store.commit('item/hideDetail');
    },
    increment() {
      this.quantity++;
    },
    decrement() {
      if(this.quantity > 1) this.quantity--;
    }
  }
}
</script>
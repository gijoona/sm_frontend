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
        :path="selectedItem.item.pig"
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
            <v-col md="8">{{ selectedItem.item.categoryCode }}</v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col md="4">Code</v-col>
            <v-col md="8">{{ selectedItem.item.code }}</v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col md="4">Name</v-col>
            <v-col md="8">{{ selectedItem.item.nameKor }}</v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col md="4">Unit</v-col>
            <v-col md="8">{{ selectedItem.item.unit }}</v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col md="4">Price</v-col>
            <v-col md="8">{{ selectedItem.item.buyPrice }}</v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col md="4">Marker</v-col>
            <v-col md="8">{{ selectedItem.item.marker }}</v-col>
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
              v-model="selectedItem.quantity"
              dense
              hide-details
              prepend-inner-icon="mdi-minus"
              append-icon="mdi-plus"
              @input="setCount"
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
              @click.stop="onSave"
            >
              Save
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
      editItem: {} 
    }
  },
  computed: {
    dialog: {
      get() {
        return this.$store.getters['cart/isShowDialog'];
      },
      set() {
        return this.$store.commit('cart/hideDetail');
      }
    },
    selectedItem:{
      get() {
        return this.$store.getters['cart/selectedItem'];
      },
      set(data) {
        this.$store.commit('cart/updatedItem', data);
      }
    },
    amount() {
      return this.selectedItem.item.buyPrice * this.selectedItem.quantity || 0;
    }
  },
  methods: {
    onSave() {
      this.$emit('onSave', this.selectedItem);
    },
    onClose() {
      this.$store.commit('cart/hideDetail');
    },
    increment() {
      this.editItem = {...this.selectedItem};
      this.editItem.quantity++;
      this.selectedItem = this.editItem;
    },
    decrement() {
      if(this.selectedItem.quantity > 1) {
        this.editItem = {...this.selectedItem};
        this.editItem.quantity--;
        this.selectedItem = this.editItem;
      }
    },
    setCount(cnt) {
      this.editItem = {...this.selectedItem};
      this.editItem.quantity = cnt;
      this.selectedItem = this.editItem;
    }
  }
}
</script>
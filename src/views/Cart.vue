<template>
  <v-container
    fluid
  >
    <v-card
      color="indigo"
      class="mb-2"
      tile
    >
      <v-form
        class='mb-2'
      >
        <v-container
          fluid
        >
          <v-row>
            <v-col 
              cols="12"
              md="6"
            >
              <v-select
                v-model="selectedCategorys"
                label="Categorys"
                :items="categorys"
                item-text="nameKor"
                item-value="code"
                multiple
                chips
                dense
                solo
                hide-details
                deletable-chips
                @mousedown="onCategoryClick"
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="searchTxt"
                label="Search"
                placeholder="코드번호, 주요단어"
                dense
                single-line
                solo
                hide-details
                append-icon="fa-search"
                @click:append="search"
                @keydown.enter="search"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-divider
        color="#9FA8DA"
      ></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          dark
          color="green darken-1"
          @click.stop="search"
        >
          <v-icon>fa-search</v-icon>
        </v-btn>
        <v-btn
          dark
          color="grey darken-1"
          @click.stop="downloadExcelFile"
        >
          <v-icon>fa-print</v-icon>
        </v-btn>
        <v-btn
          dark
          color="red darken-1"
          class="mr-2"
          @click.stop="onRemoveCarts"
        >
          <v-icon>fa-trash-alt</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    
    <v-row>
      <v-col>
        <v-data-table
          v-model="selected"
          show-select
          :headers="headers"
          :items="carts"
          item-key="id"
          :page="pageNum"
          :items-per-page="limit"
          :server-items-length="total"
          :loading="loading"
          class="elevation-1"
          disable-sort
          @click:row="showDetail"
          @update:page="updatePage"
          @update:items-per-page="updateLimit"
        >
          <template v-slot:item.item.pig="{ item }">
            <v-avatar
              tile
              size="72px"
              class="mt-2 mb-2"
            >
              <ImageComponent v-if="item.item.pig"
                :path="item.item.pig"
              />
              <v-icon v-else
                size="48"
              >fa-camera</v-icon>
            </v-avatar>
          </template>
          <template v-slot:item.quantity="props">
            <v-edit-dialog
              large
              persistent
              @save="onSave(props.item)"
              @open="onOpen(props.item)"
            >
              <div
                style="color: #1565C0;"
                class="font-weight-bold text-decoration-underline"
              >
                {{ props.item.quantity }} ({{ props.item.item.unit }})
              </div>
              <template v-slot:input>
                <div class="mt-4 text-h6">
                  Update Quantity
                </div>
                <v-text-field
                  v-model="editedItem.quantity"
                  :rules="[max7chars]"
                  label="Edit"
                  single-line
                  counter
                  autofocus
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.amount="props">
            {{ props.item.item.buyPrice * props.item.quantity }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn
              dark
              color="red darken-1"
              small
              fab
              @click.stop="onRemove(item)"
            >
              <v-icon>fa-trash-alt</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <DetailPop @onSave="onPopupSave"/>
  </v-container>
</template>
<script>
import Xlsx from 'xlsx'
import ImageComponent from '@/components/comm/Img-component.vue'
import DetailPop from '@/components/carts/contents/Detail-pop.vue'

export default {
  components: {
    ImageComponent,
    DetailPop
  },
  name: 'Cart',
  data() {
    return {
      headers: [
        { text: 'THUMBNAIL', value: 'item.pig', width:'5%', align: 'center', sortable: false },
        { text: 'CODE', value: 'item.code', align: 'center', sortable: false },
        { text: 'NAME', value: 'item.nameKor', width: '40%', sortable: false },
        { text: 'UNIT', value: 'item.unit', align: 'center', sortable: false },
        { text: 'PRICE', value: 'item.buyPrice', align: 'right', sortable: false },
        { text: 'MARKER', value: 'item.marker', align: 'center', sortable: false },
        { text: 'QUANTITY', value: 'quantity', align: 'center', sortable: false },
        { text: 'AMOUNT', value: 'amount', align: 'right', sortable: false },
        { value: 'actions', align: 'center', sortable: false },
      ],
      selected: [],
      max7chars: v => v.length <= 7 || 'Input too long!',
      editedItem: {},
      searchTxt: '',
      selectedCategorys: ['']
    }
  },
  watch: {
    selectedCategorys() {
      this.search();
    }
  },
  computed: {
    carts() {
      return this.$store.getters['cart/carts'];
    },
    pageNum() {
      return this.$store.getters['cart/pageNum'] + 1;
    },
    limit() {
      return this.$store.getters['cart/limit'];
    },
    total() {
      return this.$store.getters['cart/total'];
    },
    loading() {
      return this.$store.getters['cart/loading'];
    },
    categorys() {
      return [{ code: '', nameKor: 'ALL' }, ...(this.$store.getters['category/categorys'])];
    }
  },
  methods: {
    search() {
      this.$store.commit('cart/setPageNum', 0);
      this.$store.dispatch('cart/searchCart', { categorys: this.selectedCategorys, search: this.searchTxt })
    },
    getCartList() {
      this.$store.dispatch('category/findAll');
      this.$store.dispatch('cart/findAll');
    },
    updatePage(pageNum) {
      this.$store.commit('cart/setPageNum', pageNum - 1);
      this.$store.dispatch('cart/searchCart', { categorys: this.selectedCategorys, search: this.searchTxt })
    },
    updateLimit(limit) {
      this.$store.commit('cart/setLimit', limit);
      this.$store.dispatch('cart/searchCart', { categorys: this.selectedCategorys, search: this.searchTxt })
    },
    onOpen(item) {
      this.editedItem = {...item};
    },
    onSave() {
      this.$store.dispatch('cart/updateCart', this.editedItem);
    },
    onPopupSave(popupDate) {
      this.$store.dispatch('cart/updateCart', popupDate);
    },
    onRemove(item) {
      this.$store.dispatch('cart/removeCart', item.id);
    },
    onRemoveCarts() {
      this.$store.dispatch('cart/removeCarts', this.selected);
    },
    onCategoryClick(evt) {
      const target = evt.target.textContent || evt.target.outerText;
      const selectedChip = this.categorys.find(category => category.nameKor === target);
      if (selectedChip) {
        this.$store.commit('cart/setPageNum', 0);
        this.$store.dispatch('cart/searchCart', { categorys: [selectedChip.code], search: this.searchTxt })
      }
    },
    downloadExcelFile () {
      if (this.selected.length <= 0) {
        this.$store.dispatch('msg/showErr', '선택된 항목이 없습니다.');
        return false;
      }

      const workBook = Xlsx.utils.book_new()
      const workSheet = Xlsx.utils.json_to_sheet(this.generateExcelData())
      Xlsx.utils.book_append_sheet(workBook, workSheet, 'cart-list')

      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);

      Xlsx.writeFile(workBook, `space-marine_carts_${today.toLocaleDateString()}.xlsx`)
    },
    generateExcelData() {
      const excelDatas = this.selected.map(data => {
        const { code, nameKor, unit, buyPrice, marker } = data.item;
        return {
          code: code,
          name: nameKor,
          unit: unit,
          price: buyPrice,
          marker: marker,
          quantity: data.quantity,
          amount: buyPrice * data.quantity
        }
      });
      return excelDatas;
    },
    showDetail(item) {
      this.$store.commit('cart/visibleDetail', item);
    }
  },
  mounted() {
    this.getCartList();
  }
}
</script>
<template>
  <v-container
    fluid
  >
    <v-card
      class="mb-2"
    >
      <v-toolbar
        color="indigo"
        dark
        flat
        dense
      >
        카트정보
        <v-spacer></v-spacer>
        <v-btn
          fab
          icon
          @click="saveCartInfo"
        >
          <v-icon>fa-save</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-form>
          <v-row>
            <v-col>
              <v-text-field
                v-model="cartInfo.date"
                label="생성날짜"
                readonly
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="cartInfo.seq"
                label="생성순번"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="cartInfo.name"
                label="카트명"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-autocomplete
                v-model="cartInfo.cmpId"
                :search-input.sync="cartInfo.cmpNm"
                label="요청업체"
                :items="companyList"
                item-text="name"
                item-value="id"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="cartInfo.memo"
                label="메모"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

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
          <!-- Headers -->
          <template v-slot:header.item.pig="{ header }">
            <TranslateComponent>{{ header.text }}</TranslateComponent>
          </template>
          <template v-slot:header.item.code="{ header }">
            <TranslateComponent>{{ header.text }}</TranslateComponent>
          </template>
          <template v-slot:header.item.nameKor="{ header }">
            <TranslateComponent>{{ header.text }}</TranslateComponent>
          </template>
          <template v-slot:header.item.unit="{ header }">
            <TranslateComponent>{{ header.text }}</TranslateComponent>
          </template>
          <template v-slot:header.item.buyPrice="{ header }">
            <TranslateComponent>{{ header.text }}</TranslateComponent>
          </template>
          <template v-slot:header.item.marker="{ header }">
            <TranslateComponent>{{ header.text }}</TranslateComponent>
          </template>
          <template v-slot:header.quantity="{ header }">
            <TranslateComponent>{{ header.text }}</TranslateComponent>
          </template>
          <template v-slot:header.amount="{ header }">
            <TranslateComponent>{{ header.text }}</TranslateComponent>
          </template>
          <!-- Headers -->

          <!-- Bodys -->
          <template v-slot:item.item.pig="{ item }">
            <v-avatar
              tile
              size="72px"
              class="mt-2 mb-2"
            >
              <ImgComponent v-if="item.item.pig"
                :path="item.item.pig"
              />
              <v-icon v-else
                size="48"
              >fa-camera</v-icon>
            </v-avatar>
          </template>

          <template v-slot:item.item.name="{ item }">
            <span v-if="langType === 'KOR'">
              {{ item.item.nameKor }}
            </span>
            <span v-else>
              {{ item.item.nameEng }}
            </span>
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
            <CurrencyComponent>{{ props.item.item.buyPrice * props.item.quantity }}</CurrencyComponent>
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
          <!-- Bodys -->

          <!-- no data or no results -->
          <template v-slot:no-data>
            <v-btn
              to="/prices"
              color="indigo"
              dark
              text
              x-large
              block
              class="font-weight-black"
            >
              <v-icon 
                small
                class="mr-2"
              >fa-plus</v-icon>
              제품담기
            </v-btn>
          </template>
          <template v-slot:no-results>
            <v-btn
              to="/prices"
              color="indigo"
              dark
              text
              x-large
              block
              class="font-weight-black"
            >
              <v-icon 
                small
                class="mr-2"
              >fa-plus</v-icon>
              제품담기
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row v-for="(category, idx) in categoryCompanyList" :key="'cat' + idx">
      <v-col>
        <v-card>
          <v-toolbar
            color="indigo"
            flat
            dark
            dense
          >
            <v-toolbar-title
              class="text-overline font-weight-black"
            >
              {{ category.code }}. {{ category.nameKor }}
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-row
              class="text-center text-overline font-weight-black"
            >
              <v-col>업체명</v-col>
              <v-divider vertical></v-divider>
              <v-col>이메일</v-col>
              <v-divider vertical></v-divider>
              <v-col>전화번호</v-col>
              <v-divider vertical></v-divider>
              <v-col>팩스</v-col>
            </v-row>

            <v-divider></v-divider>

            <div v-for="(company, idx) in category.companys" :key="'comp' + idx">
              <v-row
                class="py-3 text-center"
              >
                <v-col>{{ company.name }}</v-col>
                <v-divider vertical></v-divider>
                <v-col>{{ company.email }}</v-col>
                <v-divider vertical></v-divider>
                <v-col>{{ company.tel }}</v-col>
                <v-divider vertical></v-divider>
                <v-col>{{ company.fax }}</v-col>
              </v-row>
              <v-divider></v-divider>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <DetailPop @onSave="onPopupSave"/>
  </v-container>
</template>
<script>
import Xlsx from 'xlsx'
import DetailPop from '@/components/carts/contents/Detail-pop.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    DetailPop
  },
  name: 'Cart',
  data() {
    return {
      headers: [
        { text: 'THUMBNAIL', value: 'item.pig', width:'5%', align: 'center', sortable: false },
        { text: 'CODE', value: 'item.code', align: 'center', sortable: false },
        { text: 'NAME', value: 'item.name', width: '40%', sortable: false },
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
      selectedCategorys: [''],
      categoryCompanyList: [],
      companyNm: ''
    }
  },
  watch: {
    selectedCategorys() {
      this.search();
    },
    cartCategorys() {
      this.getCompanyList();
    }
  },
  computed: {
    ...mapGetters({
      carts: 'cart/carts',
      limit: 'cart/limit',
      total: 'cart/total',
      cartCategorys: 'cart/cartCategorys',
      loading: 'cart/loading',
      langType: 'lang/type',
      companyList: 'user/companyList'
    }),
    pageNum() {
      return this.$store.getters['cart/pageNum'] + 1;
    },
    categorys() {
      return [{ code: '', nameKor: 'ALL' }, ...(this.$store.getters['category/categorys'])];
    },
    cartInfo() {
      return {...{}, ...(this.$store.getters['cart/cartInfo'])};
    }
  },
  methods: {
    search() {
      this.$store.commit('cart/setPageNum', 0);
      this.$store.dispatch('cart/searchCart', { categorys: this.selectedCategorys, search: this.searchTxt })
    },
    getCartList() {
      this.$store.dispatch('category/findAll');
      this.$store.dispatch('user/findCompAll');
      this.$store.dispatch('cart/findAll');
    },
    getCompanyList() {
      this.categoryCompanyList = [];
      for(let code of this.cartCategorys) {
        this.$store.dispatch('category/findCompanyList', code)
                    .then(data => this.categoryCompanyList.push(...data));
      }
    },
    updatePage(pageNum) {
      this.$store.commit('cart/setPageNum', pageNum - 1);
      this.$store.dispatch('cart/searchCart', { categorys: this.selectedCategorys, search: this.searchTxt })
    },
    updateLimit(limit) {
      this.$store.commit('cart/setLimit', limit);
      this.$store.dispatch('cart/searchCart', { categorys: this.selectedCategorys, search: this.searchTxt })
    },
    saveCartInfo() {
      this.$store.dispatch('cart/saveCart', { cart: this.cartInfo });
    },
    onOpen(item) {
      this.editedItem = {...item};
    },
    onSave() {
      this.$store.dispatch('cart/updateCartItem', this.editedItem);
    },
    onPopupSave(popupDate) {
      this.$store.dispatch('cart/updateCartItem', popupDate);
    },
    onRemove(item) {
      this.$store.dispatch('cart/removeCartItem', item.id);
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
    if(this.cartInfo && this.cartInfo.id) this.getCartList();
    else {
      alert('마이페이지 > 카트리스트에서 카트를 선택해주세요.');
      this.$router.push('mypage');
    }
  }
}
</script>
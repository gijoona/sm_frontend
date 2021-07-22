<template>
  <v-container>
    <v-row v-if="isMemberEdit || isCompanyEdit">
      <v-col v-if="isMemberEdit">
        <ProfileEdit :member="memberinfo" @finish="onFinish" />
      </v-col>
      <v-col v-else>
        <CompanyEdit :comp="memberinfo.comp" @finish="onFinish" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <Profile :member="memberinfo" @edit="onEdit" />
      </v-col>
      <v-col v-if="memberinfo.comp">
        <Company :comp="memberinfo.comp" @edit="onEdit" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-toolbar
            dark
            color="indigo"
            class="font-weight-bold"
            flat
          >
            카트리스트
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="addCart"
            >
              <v-icon>fa-plus</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-container
              class="text-center d-flex flex-column justify-center"
            >
              <v-row>
                <v-col
                  cols="12"
                  sm="2"
                >생성일자</v-col>
                <v-col
                  cols="12"
                  sm="1"
                >생성순번</v-col>
                <v-col
                  cols="12"
                  sm="6"
                >카트명</v-col>
                <v-col
                  cols="12"
                  sm="1"
                >제품수</v-col>
                <v-col></v-col>
              </v-row>
              <v-divider></v-divider>
              <div
                v-if="cartList.length > 0"
              >
                <v-row
                  v-for="(cart, idx) of cartList" :key="idx"
                  dense
                  justify="center"
                >
                  <v-col
                    cols="12"
                    sm="2"
                    class="pt-5"
                  >{{ cart.date }}</v-col>
                  <v-divider vertical></v-divider>
                  <v-col
                    cols="12"
                    sm="1"
                    class="pt-5"
                  >{{ cart.seq }}</v-col>
                  <v-divider vertical></v-divider>
                  <v-col
                    cols="12"
                    sm="6"
                    class="pt-5 px-3 text-left"
                  >{{ cart.name }}</v-col>
                  <v-divider vertical></v-divider>
                  <v-col
                    cols="12"
                    sm="1"
                    class="pt-5"
                  >{{ cart.count }}</v-col>
                  <v-divider vertical></v-divider>
                  <v-col
                    class="text-right"
                  >
                    <v-btn-toggle
                      dense
                      group
                    >
                      <v-btn
                        icon
                        @click="movePage(cart, 'cart')"
                      >
                        <v-icon small>fa-list</v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        color="primary"
                        @click="movePage(cart, 'prices')"
                      >
                        <v-icon small>fa-plus</v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        color="red"
                        @click="removeCart(cart.id)"
                      >
                        <v-icon small>fa-trash</v-icon>
                      </v-btn>
                    </v-btn-toggle>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
              </div>
              <div
                v-else
              >
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <v-btn
                      text
                      block
                      color="primary"
                      x-large
                      @click="addCart"
                    >
                      <v-icon
                        class="mr-2"
                      >fa-plus</v-icon>
                      카트생성
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Profile from '@/components/mypages/Profile.vue'
import ProfileEdit from '@/components/mypages/Profile-edit.vue'
import Company from '@/components/mypages/Company.vue'
import CompanyEdit from '@/components/mypages/Company-edit.vue'

export default {
  components: {
    Profile,
    ProfileEdit,
    Company,
    CompanyEdit
  },
  name: 'Mypage',
  data() {
    return {
      memberinfo: {},
      isMemberEdit: false,
      isCompanyEdit: false,
    }
  },
  computed: {
    ...mapGetters({
      loginUser: 'user/userinfo',
      cartList: 'cart/cartList'
    }),
  },
  methods: {
    findUserInfo() {
      this.$store.dispatch('user/findId', this.loginUser.id)
          .then(res => {
            this.memberinfo = res.data;
          });

      this.$store.dispatch('cart/findCarts');
    },
    movePage(cart, page) {
      this.$store.commit('cart/setCartInfo', cart);
      this.$router.push(page);
    },
    onEdit(cmd) {
      if(cmd === 'member') this.isMemberEdit = true;
      else this.isCompanyEdit = true;
    },
    addCart() {
      this.$store.dispatch('cart/addCart')
          .then(() => {
            this.$router.push('cart');
          });
    },
    removeCart(id) {
      this.$store.dispatch('cart/removeCart', id);
    },
    onFinish() {
      this.findUserInfo();
      this.isMemberEdit = this.isCompanyEdit = false;
    }
  },
  mounted() {
    this.findUserInfo();
  }
}
</script>
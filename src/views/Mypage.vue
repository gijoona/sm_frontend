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
          <v-list
            outline
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-row
                    class="text-center text-overline font-weight-black"
                  >
                    <v-col>생성일자</v-col>
                    <v-col>카트번호</v-col>
                    <v-col>카트명</v-col>
                    <v-col></v-col>
                  </v-row>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-for="(cart, idx) of cartList" :key="idx"
            >
              <v-list-item-content>
                <v-list-item-title>
                  <v-row>
                    <v-col
                      class="text-center"
                    >{{ cart.date }}</v-col>
                    <v-col
                      class="text-center"
                    >{{ cart.seq }}</v-col>
                    <v-col>{{ cart.name }}</v-col>
                  </v-row>
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-chip>
                  {{ cart.count }}
                </v-chip>
              </v-list-item-icon>
              <v-list-item-action>
                <v-btn-toggle
                  dense
                  group
                >
                  <v-btn
                    icon
                    @click="movePage(cart, '/cart')"
                  >
                    <v-icon small>fa-list</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    color="primary"
                    @click="movePage(cart, '/prices')"
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
              </v-list-item-action>
            </v-list-item>
          </v-list>
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
            this.$router.push('/cart');
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
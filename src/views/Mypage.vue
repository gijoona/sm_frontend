<template>
  <v-container>
    <v-row>
      <v-col>
        <ProfileEdit v-if="isEdit" :member="memberinfo" @finish="onFinish" />
        <Profile v-else :member="memberinfo" @edit="onEdit" />
      </v-col>
      <v-col v-if="memberinfo.comp">
        <v-card>
          <v-toolbar
            color="indigo"
            flat
            dark
          >
            업체정보
          </v-toolbar>
          <v-card-text>
            <v-row
              class="py-2"
            >
              <v-col
                class="text-overline text-center font-weight-black"
              >업체명</v-col>
              <v-divider vertical></v-divider>
              <v-col>{{ memberinfo.comp.name }}</v-col>
              <v-divider vertical></v-divider>
              <v-col
                class="text-overline text-center font-weight-black"
              >대표자 성명</v-col>
              <v-divider vertical></v-divider>
              <v-col>{{ memberinfo.comp.ceoNm }}</v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row
              class="py-2"
            >
              <v-col
                class="text-overline text-center font-weight-black"
              >사업자등록번호</v-col>
              <v-divider vertical></v-divider>
              <v-col>{{ memberinfo.comp.cmpNo }}</v-col>
              <v-divider vertical></v-divider>
              <v-col
                class="text-overline text-center font-weight-black"
              >법인번호</v-col>
              <v-divider vertical></v-divider>
              <v-col>{{ memberinfo.comp.bzNo }}</v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row
              class="py-2"
            >
              <v-col
                class="text-overline text-center font-weight-black"
              >전화번호</v-col>
              <v-divider vertical></v-divider>
              <v-col>{{ memberinfo.comp.tel }}</v-col>
              <v-divider vertical></v-divider>
              <v-col
                class="text-overline text-center font-weight-black"
              >팩스번호</v-col>
              <v-divider vertical></v-divider>
              <v-col>{{ memberinfo.comp.fax }}</v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row
              class="py-2"
            >
              <v-col
                cals="12"
                sm="3"
                class="text-overline text-center font-weight-black"
              >이메일</v-col>
              <v-divider vertical></v-divider>
              <v-col>{{ memberinfo.comp.email }}</v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row
              class="py-2"
            >
              <v-col
                cals="12"
                sm="3"
                class="text-overline text-center font-weight-black"
              >주소</v-col>
              <v-divider vertical></v-divider>
              <v-col>({{ memberinfo.comp.zipCode }}) {{ memberinfo.comp.addr1 }} {{ memberinfo.comp.addr2 }}</v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col
                cals="12"
                sm="3"
                class="text-overline text-center font-weight-black"
              >취급 품목</v-col>
              <v-divider vertical></v-divider>
              <v-col>
                <v-virtual-scroll
                  height="181"
                  item-height="50"
                  :items="memberinfo.comp.categorys"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item>
                      <v-list-item-content>
                        {{ item.code }}.{{ item.nameKor }}
                      </v-list-item-content>
                    </v-list-item>

                    <v-divider></v-divider>
                  </template>
                </v-virtual-scroll>
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-list
            outline
          >
            <v-list-item
              to="/cart"
            >
              <v-list-item-content>
                <v-list-item-title>
                  Cart
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-chip>
                  {{ cartCnt }}
                </v-chip>
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

export default {
  components: {
    Profile,
    ProfileEdit
  },
  name: 'Mypage',
  data() {
    return {
      memberinfo: {},
      cartCnt: 0,
      isEdit: false
    }
  },
  computed: {
    ...mapGetters({
      loginUser: 'user/userinfo'
    }),
  },
  methods: {
    findUserInfo() {
      this.$store.dispatch('user/findId', this.loginUser.id)
          .then(res => {
            this.memberinfo = res.data;
            this.cartCnt = this.memberinfo.carts[0].cartCnt;
          });
    },
    onEdit() {
      this.isEdit = true;
    },
    onFinish() {
      this.findUserInfo();
      this.isEdit = false;
    }
  },
  mounted() {
    this.findUserInfo();
  }
}
</script>
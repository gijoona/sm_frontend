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
      cartCnt: 0,
      isMemberEdit: false,
      isCompanyEdit: false
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
            this.cartCnt = 0;
          });
    },
    onEdit(cmd) {
      if(cmd === 'member') this.isMemberEdit = true;
      else this.isCompanyEdit = true;
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
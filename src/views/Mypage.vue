<template>
  <v-container>
    <v-row v-if="isEdit">
      <v-col>
        <ProfileEdit :member="memberinfo" @finish="onFinish" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <Profile :member="memberinfo" @edit="onEdit" />
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
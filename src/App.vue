<template>
  <v-app
    style="background: #FAFAF0;"
  >
    <LoadingComponent />
    <MsgbarComponent />

    <v-navigation-drawer 
      app
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>fa-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <TranslateComponent>HOME</TranslateComponent>
            </v-list-item-title>
          </v-list-item>
          <v-list-item to="/prices">
            <v-list-item-icon>
              <v-icon>fa-list</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <TranslateComponent>PRICES</TranslateComponent>
            </v-list-item-title>
          </v-list-item>

          <v-spacer></v-spacer>

          <v-list-item to="/mypage">
            <v-list-item-icon>
              <v-icon>fa-user</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <TranslateComponent>MYPAGE</TranslateComponent>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-system-bar
      app
      window
      color="#FAFAF0"
    >
      <v-spacer></v-spacer>
      <span v-if="!isLogin">
        <span
          class="mr-4 text-overline font-weight-black"
        >
          SPACE-MARINE에 오신 걸 환영합니다.
        </span>
        <v-btn
          icon
          @click="movePage('login')"
        >
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </span>
      <span v-else>
        <span
          class="mr-4 text-overline font-weight-black"
        >
          안녕하세요. {{ userinfo.name }} 님
        </span>
        <v-btn
          icon
          link
          to="/cart"
        >
          <v-icon>mdi-cart</v-icon>
        </v-btn>
        <v-btn
          icon
          @click="logout"
        >
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </span>
    </v-system-bar>

    <v-app-bar
      app
      flat
      :prominent="prominent"
      :color="bg_color"
      height="40"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-app-bar-title
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          width="100"
        >
          Space Marine
        </v-app-bar-title>
      </div>

      <v-spacer></v-spacer>

      <div 
        class="d-flex align-right"
      >
        <div
          class="shrink mt-1 hidden-sm-and-down"
        >
          <v-tabs
            align-with-title
            :background-color="bg_color"
            height="35"
          >
            <v-tab to="/">
              <TranslateComponent>HOME</TranslateComponent>
            </v-tab>
            <v-tab to="/prices">
              <TranslateComponent>PRICES</TranslateComponent>
            </v-tab>
            <v-tab to="/mypage">
              <TranslateComponent>MYPAGE</TranslateComponent>
            </v-tab>
            <v-tabs-slider color="black"></v-tabs-slider>
          </v-tabs>

        </div>
        <v-app-bar-nav-icon 
          class="shrink mt-1 hidden-md-and-up"
          @click="drawer = true"></v-app-bar-nav-icon>
      </div>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container 
        fluid
        style="height: 100%;"
      >

        <!-- If using vue-router -->
        <router-view></router-view>

        <v-fab-transition>
          <v-btn
            color="indigo"
            dark
            fixed
            bottom
            right
            fab
            @click="$vuetify.goTo(target, options)"
          >
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-container>
    </v-main>

    <v-footer app>
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          class="text-center"
          cols="12"
        >
          Copyrightⓒ2021 All rights reserved Space-Marine Co.
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',

  data: () => ({
    drawer: false,
    prominent: false,
    bg_color: '#FAFAF0',
    type: 'number',
    number: 0,
    duration: 500,
    offset: 0,
    easing: 'easeInOutCubic'
  }),

  watch: {
    isLogin(val) {
      if (val) this.$router.push('/');
    }
  },
  computed: {
    target() {
      return Number(this[this.type])
    },
    options() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing
      }
    },
    ...mapGetters({
      isLogin: 'user/isLogin',
      userinfo: 'user/userinfo'
    })
  },
  methods: {
    movePage(page) {
      this.$router.push(page);
    },
    logout() {
      this.$store.dispatch('user/logout');
    }
  },
  beforeCreate() {
    this.$store.dispatch('lang/find');
  }
};
</script>
<template>
  <v-app>
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
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item to="/items">
            <v-list-item-icon>
              <v-icon>fa-list</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Items</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-system-bar
      app
      dark
      color="primary"
      height="50"
    >
      <v-spacer></v-spacer>
      
      <v-btn
        icon
      >
        <v-icon>fa-user-circle</v-icon>
      </v-btn>
      <v-btn
        icon
        to="/login"
      >
        <v-icon>mdi-login</v-icon>
      </v-btn>
      <v-btn
        icon
        to="/logout"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-system-bar>

    <v-app-bar
      app
      dense
      flat
      :prominent="prominent"
      color="primary"
      dark
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

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-right">
        <div
          class="shrink mt-1 hidden-sm-and-down"
        >
          <v-btn
            text
            to="/"
          >
            <v-icon>fa-home</v-icon>
            <span class="ml-2">Home</span>
          </v-btn>
          <v-btn
            text
            to="/items"
          >
            <v-icon>fa-list</v-icon>
            <span class="ml-2">Items</span>
          </v-btn>
        </div>
        <v-app-bar-nav-icon 
          class="shrink mt-1 hidden-sm-and-up"
          @click="drawer = true"></v-app-bar-nav-icon>
      </div>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      Copyright 2021. Space Marine
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    drawer: false,
    prominent: true,
  }),
};
</script>
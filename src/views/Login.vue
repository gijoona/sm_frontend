<template>
  <v-parallax
    dark
    color="transparent"
    style="width:100%; height:100%;"
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    :height="fullHeight"
  >
    <v-row
      class="d-flex align-center"
    >
      <v-col>
        <v-card
          class="elevation-6 mx-auto"
          max-width="250"
          min-height="250"
        >
          <v-toolbar
            flat
            tile
            dark
            color="indigo"
          >
            <v-toolbar-title
              class="mx-auto font-weight-black"
            >Login</v-toolbar-title>
          </v-toolbar>
          
          <v-card-text>
            <v-form
              v-model="valid"
            >
              <v-text-field
                v-model="username"
                :counter="20"
                :roles="usernameRules"
                label="USER ID"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="PASSWORD"
                type="password"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-divider
            class="mx-4"
          ></v-divider>

          <v-card-actions>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="6"
                class="pb-0"
              >
                <v-btn
                  block
                  dark
                  color="indigo"
                  @click="login"
                >Login</v-btn>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="6"
              >
                <v-btn
                  block
                  dark
                  color="green"
                  to="/join"
                >Join</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-parallax>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      valid: true,
      usernameRules: [
        v => !!v || 'ID is required',
        v => (v && v.length >= 5) || 'ID must be more than 5 characters',
        v => (v && v.length <= 20) || 'ID must be less than 20 characters',
      ],
    }
  },
  computed: {
    username: {
      get() {
        return this.$store.getters['user/username'];
      },
      set(val) {
        this.$store.commit('user/setUsername', val);
      }
    },
    password: {
      get() {
        return this.$store.getters['user/password'];
      },
      set(val) {
        this.$store.commit('user/setPassword', val);
      }
    },
    fullHeight() {
      return (window.innerHeight * 100) / 100;
    }
  },
  methods: {
    login() {
      this.$store.dispatch('user/login');
    }
  }
}
</script>
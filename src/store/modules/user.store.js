import instance from './../../plugins/axios'

// initial state
const state = () => ({
  username: '',
  password: '',
  userinfo: {},
  isLogin: false
})

// getters
const getters = {
  username(state) {
    return state.username;
  },
  password(state) {
    return state.password;
  },
  userinfo(state) {
    return state.userinfo;
  },
  isLogin(state) {
    return state.isLogin;
  }
}

// actions
const actions = {
  async login({ dispatch, commit, state }) {
    commit('loading/enable', {}, { root: true });
    await instance
            .post('/auth/login', { username: state.username, password: state.password })
            .then(res => {
              commit('loginSuccess', res.data.user);
              sessionStorage.setItem('access_token', res.data.access_token);
              commit('loading/disable', {}, { root: true });
            })
            .catch(() => {
              commit('setUsername', '');
              commit('setPassword', '');
              dispatch('msg/showErr', '로그인 정보를 확인해주세요.', { root: true });
              commit('loading/disable', {}, { root: true });
            })
  },
  logout({commit}) {
    commit('logoutSuccess');
  },
  async save({ commit }, payload) {
    commit('loading/enable', {}, { root: true });
    await instance
              .post('/users/save', payload.savedItem )
              .then(() => {
                commit('loading/disable', {}, { root: true });
              });
  },
}

// mutations
const mutations = {
  setUsername(state, payload) {
    state.username = payload;
  },
  setPassword(state, payload) {
    state.password = payload;
  },
  loginSuccess(state, payload) {
    state.userinfo = payload;
    state.isLogin = true;
  },
  logoutSuccess(state) {
    state.userinfo = {};
    state.isLogin = false;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
import axios from 'axios';

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
  async login({ commit, state }) {
    await axios
            .post('http://ec2-3-12-199-144.us-east-2.compute.amazonaws.com:5000/auth/login', { username: state.username, password: state.password })
            .post('http://localhost:5000/auth/login', { username: state.username, password: state.password })
            .then(res => {
              commit('loginSuccess', res.data.user);
              sessionStorage.setItem('userinfo', res.data.user);
              sessionStorage.setItem('access_token', res.data.access_token);
            })
            .catch(err => {
              console.error(err);
              commit('setUsername', '');
              commit('setPassword', '');
              alert('로그인 정보를 확인해주세요.');
            })
  },
  logout({commit}) {
    commit('logoutSuccess');
  }
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
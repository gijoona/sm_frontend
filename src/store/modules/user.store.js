import instance from './../../plugins/axios'

// initial state
const state = () => ({
  username: '',
  password: '',
  userinfo: {},
  companyList: [],
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
  },
  companyList(state) {
    return state.companyList;
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
  async join({ commit }, payload) {
    commit('loading/enable', {}, { root: true });
    return await instance
              .post('/users/create', payload.memberInfo )
              .then(() => {
                commit('loading/disable', {}, { root: true });
              });
  },
  async findId({ commit }, payload) {
    commit('loading/enable', {}, { root: true });
    return await instance
              .get(`/users/findOne/${payload}`)
              .then((res) => {
                commit('loading/disable', {}, { root: true });
                return res;
              })
  },
  async save({ commit }, payload) {
    commit('loading/enable', {}, { root: true });
    return await instance
              .post('/users/save', payload.memberInfo )
              .then(() => {
                commit('loading/disable', {}, { root: true });
              });
  },
  async finCmpNo({ commit }, payload) {
    commit('loading/enable', {}, { root: true });
    return await instance
              .get(`/comps/findCmpNo/${payload}`)
              .then((res) => {
                commit('loading/disable', {}, { root: true });
                return res;
              })
  },
  async findCompAll({ commit }) {
    await instance
              .get('/comps/findComp?search=')
              .then(res => {
                console.log(res.data);
                commit('setCompanyList', res.data);
              })
  },
  async registComp({ commit }, payload) {
    commit('loading/enable', {}, { root: true });
    payload.companyInfo.categorys = payload.categorys;
    return await instance
              .post('/comps/save', payload.companyInfo )
              .then((res) => {
                commit('loading/disable', {}, { root: true });
                return res;
              })
  },
  async updateComp({ commit }, payload) {
    commit('loading/enable', {}, { root: true });
    payload.companyInfo.categorys = payload.categorys;
    return await instance
              .patch('/comps/update', payload.companyInfo )
              .then((res) => {
                commit('loading/disable', {}, { root: true });
                return res;
              })
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
  },
  setCompanyList(state, payload) {
    state.companyList = payload;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
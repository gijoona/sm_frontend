import instance from './../../plugins/axios'

// initial state
const state = () => ({
  pageNum: 0,
  limit: 15,
  total: 0,
  loading: false,
  carts: []
})

// getters
const getters = {
  carts(state) {
    return state.carts;
  },
  pageNum(state) {
    return state.pageNum;
  },
  limit(state) {
    return state.limit;
  },
  total(state) {
    return state.total;
  },
  loading(state) {
    return state.loading;
  }
}

// actions
const actions = {
  async findAll({ commit, state }, payload) {
    await instance
            .get(`/users/carts/${payload}?page=${state.pageNum}&limit=${state.limit}`)
            .then(res => {
              console.log(res.data);
              commit('setCarts', res.data.rows);
              commit('setTotal', res.data.count);
            })
  },
  async searchCarts({ commit, state }, payload) {
    await instance
            .get(`/users/carts/${payload.id}?page=${state.pageNum}&limit=${state.limit}&search=${payload.searchTxt}`)
            .then(res => {
              commit('setCarts', res.data.rows);
              commit('setTotal', res.data.count);
            })
  },
  async addCart({ state }, payload) {
    await instance
            .post('/cart/add', payload)
            .then(res => {
              console.log(state, res.data);
            });
  }
}

// mutations
const mutations = {
  setCarts(state, payload) {
    state.carts = payload;
  },
  setTotal(state, payload) {
    state.total = payload;
  },
  setPageNum(state, payload) {
    state.pageNum = payload;
  },
  enableLoading(state) {
    state.loading = true;
  },
  disableLoading(state) {
    state.loading = false;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
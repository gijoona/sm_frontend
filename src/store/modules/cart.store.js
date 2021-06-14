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
  async findAll({ commit, state, rootGetters }) {
    // 전역 store 이용. user의 userinfo getter를 호출
    const { id } = rootGetters['user/userinfo'];

    await instance
            .get(`/users/carts/${id}?page=${state.pageNum}&limit=${state.limit}`)
            .then(res => {
              commit('setCarts', res.data.rows);
              commit('setTotal', res.data.count);
            })
  },
  async searchCarts({ commit, state, rootGetters }, payload) {
    // 전역 store 이용. user의 userinfo getter를 호출
    const { id } = rootGetters['user/userinfo'];

    await instance
            .get(`/users/carts/${id}?page=${state.pageNum}&limit=${state.limit}&search=${payload.searchTxt}`)
            .then(res => {
              commit('setCarts', res.data.rows);
              commit('setTotal', res.data.count);
            })
  },
  async addCart({ dispatch, rootGetters }, payload) {
    // 전역 store 이용. user의 userinfo getter를 호출
    const { code } = rootGetters['user/userinfo'];
    const cart = {
      userCd: code,
      itemCd: payload.code,
      itemSeq: 1,
      quantity: 1
    };
    
    await instance
            .post('/cart/add', cart)
            .then(() => {
              dispatch('msg/showInfo', '제품이 카트에 추가되었습니다.', { root: true });
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
  },
  updateCart(state, payload) {
    // TODO :: Cart 갱신로직 개발 중
    let cart = state.carts.find(cart => cart.id === payload.id);
    let temp = {...cart, ...payload};
    console.log(cart, temp);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
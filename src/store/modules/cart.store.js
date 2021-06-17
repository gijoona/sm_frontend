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
    commit('enableLoading');
    // 전역 store 이용. user의 userinfo getter를 호출
    const { id } = rootGetters['user/userinfo'];

    await instance
            .get(`/users/carts/${id}?page=${state.pageNum}&limit=${state.limit}`)
            .then(res => {
              commit('setCarts', res.data.rows);
              commit('setTotal', res.data.count);
              commit('disableLoading');
            })
            .catch(() => {
              commit('disableLoading');
            })
  },
  async searchCart({ commit, state, rootGetters }, payload) {
    commit('enableLoading');
    // 전역 store 이용. user의 userinfo getter를 호출
    const { id } = rootGetters['user/userinfo'];

    await instance
            .post(`/users/carts/${id}`, {
              page: state.pageNum,
              limit: state.limit,
              categorys: payload.categorys,
              search: payload.search
            })
            .then(res => {
              commit('setCarts', res.data.rows);
              commit('setTotal', res.data.count);
              commit('disableLoading');
            })
            .catch(() => {
              commit('disableLoading');
            })
  },
  async addCart({ dispatch, commit, rootGetters }, payload) {
    commit('loading/enable', {}, { root: true });
    // 전역 store 이용. user의 userinfo getter를 호출
    const { code } = rootGetters['user/userinfo'];
    const cart = {
      userCd: code,
      itemCd: payload.code,
      itemSeq: 1,
      quantity: payload.quantity || 1
    };
    
    await instance
            .post('/cart/add', cart)
            .then(() => {
              dispatch('msg/showInfo', '제품이 카트에 추가되었습니다.', { root: true });
              commit('loading/disable', {}, { root: true });
            })
            .catch(() => {
              commit('loading/disable', {}, { root: true });
            });
  },
  async updateCart({ dispatch }, payload) { 
    await instance
            .patch(`/cart/update`, payload)
            .then(() => {
              dispatch('msg/showInfo', '수량이 변경되었습니다.', { root: true });
              dispatch('findAll');
            });
  },
  async removeCart({ dispatch }, payload) {
    await instance
            .delete(`/cart/remove/${payload}`)
            .then(() => {
              dispatch('msg/showInfo', '항목이 삭제되었습니다.', { root: true });
              dispatch('findAll');
            })
  },
  async removeCarts({ dispatch, commit }, payload) {
    commit('loading/enable', {}, { root: true });

    await instance
            .post('/cart/remove',{
              carts: payload
            })
            .then((res) => {
              commit('loading/disable', {}, { root: true });
              dispatch('msg/showInfo', `${res.data}개 항목이 삭제되었습니다.`, { root: true });
              dispatch('findAll');
            })
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
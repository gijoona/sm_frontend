import instance from './../../plugins/axios'

// initial state
const state = () => ({
  items: [],
  limit: 15,
  pageNum: 0,
  count: 15,
  total: 0,
  loading: false,
  isCardView: false
})

// getters
const getters = {
  items(state) {
    return state.items;
  },
  loading(state) {
    return state.loading;
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
  isCardView(state) {
    return state.isCardView;
  }
}

// actions
const actions = {
  async findAll({ commit, state }, payload) {
    commit('enableLoading');
    await instance
            .get(`/items/findAll?page=${state.pageNum}&limit=${state.limit}${payload.categoryCode ? '&category=' + payload.categoryCode : ''}`)
            .then(res => {
              commit('setCount', res.data.rows.length);
              if(res.data.rows.length > 0) {
                if (state.isCardView) commit('appendItems', res.data.rows);
                else commit('setItems', res.data.rows);
                commit('setTotal', res.data.count);
              }
              commit('disableLoading');
            });
  },
  async search({ commit, state }, payload) {
    commit('enableLoading');
    await instance
            .get(`/items/find?page=${state.pageNum}&limit=${state.limit}${payload.categoryCode ? '&category=' + payload.categoryCode : ''}${payload.searchTxt ? '&search=' + payload.searchTxt : ''}`)
            .then(res => {
              commit('setCount', res.data.rows.length);
              if (res.data.rows.length > 0) {
                if (state.isCardView) commit('appendItems', res.data.rows);
                else commit('setItems', res.data.rows);
                commit('setTotal', res.data.count);
              }
              commit('disableLoading');
            })
  },
  async searchItems({ dispatch }, payload) {
    if (payload.searchTxt) dispatch('search', payload);
    else dispatch('findAll', payload);
  }
}

// mutations
const mutations = {
  setPageNum(state, payload) {
    state.pageNum = payload;
  },
  incrementPageNum(state) {
    state.pageNum += 1;
  },
  decrementPageNum(state) {
    state.pageNum -= 1;
  },
  resetPageNum(state) {
    state.pageNum = 0;
  },
  setItems(state, payload) {
    state.items = payload;
  },
  appendItems(state, payload) {
    state.items.push(...payload);
  },
  resetItems(state) {
    state.items = [];
  },
  setCount(state, payload) {
    state.count = payload;
  },
  resetCount(state) {
    state.count = state.limit;
  },
  enableLoading(state) {
    state.loading = true;
  },
  disableLoading(state) {
    state.loading = false;
  },
  setTotal(state, payload) {
    state.total = payload;
  },
  toggleIsCardView(state) {
    state.isCardView = !state.isCardView;
  },
  setIsCardView(state, payload) {
    state.isCardView = payload;
  },
  resetPagination(state) {
    state.count = state.limit;
    state.pageNum = 0;
    state.items = [];
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
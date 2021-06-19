import instance from './../../plugins/axios'

// initial state
const state = () => ({
  items: [],
  limit: 15,
  pageNum: 0,
  count: 15,
  total: 0,
  loading: false,
  isCardView: false,
  isShowDialog: false,
  selectedItem: {}
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
  },
  isShowDialog(state) {
    return state.isShowDialog;
  },
  selectedItem(state) {
    return state.selectedItem;
  }
}

// actions
const actions = {
  async findAll({ commit, state, rootGetters }) {
    // 전역 store 이용. category의 code getter를 호출
    const categoryCode = rootGetters['category/code'];

    commit('enableLoading');
    await instance
            .get(`/items/findAll?page=${state.pageNum}&limit=${state.limit}${categoryCode ? '&category=' + categoryCode : ''}`)
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
  async search({ commit, state, rootGetters }, payload) {
    // 전역 store 이용. category의 code getter를 호출
    const categoryCode = rootGetters['category/code'];

    commit('enableLoading');
    await instance
            .get(`/items/find?page=${state.pageNum}&limit=${state.limit}${categoryCode ? '&category=' + categoryCode : ''}${payload.searchTxt ? '&search=' + payload.searchTxt : ''}`)
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
  setLimit(state, payload) {
    state.limit = payload === -1 ? state.total : payload;
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
  },
  visibleDetail(state, payload) {
    state.isShowDialog = true;
    state.selectedItem = payload;
  },
  hideDetail(state) {
    state.isShowDialog = false;
    state.selectedItem = {};
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
import axios from 'axios'

// initial state
const state = () => ({
  items: [],
  limit: 30,
  pageNum: 0,
  count: 30
})

// getters
const getters = {
  items(state) {
    return state.items;
  }
}

// actions
const actions = {
  async findAll({ commit, state }, payload) {
    if (state.count < state.limit) return;
    await axios
            .get(`http://ec2-3-12-199-144.us-east-2.compute.amazonaws.com:5000/items/findAll?page=${state.pageNum}&limit=${state.limit}${payload.categoryCode ? '&category=' + payload.categoryCode : ''}`)
            // .get(`http://172.21.13.235:5000/items/findAll?page=${state.pageNum}&limit=${state.limit}${payload.categoryCode ? '&category=' + payload.categoryCode : ''}`)
            .then(res => {
              commit('setCount', res.data.length);
              if(res.data.length > 0) commit('appendItem', res.data);
            });
  },
  async search({ commit, state }, payload) {
    if (state.count < state.limit) return;
    await axios
            .get(`http://ec2-3-12-199-144.us-east-2.compute.amazonaws.com:5000/items/find?page=${state.pageNum}&limit=${state.limit}${payload.categoryCode ? '&category=' + payload.categoryCode : ''}${payload.searchTxt ? '&search=' + payload.searchTxt : ''}`)
            // .get(`http://172.21.13.235:5000/items/find?page=${state.pageNum}&limit=${state.limit}${payload.categoryCode ? '&category=' + payload.categoryCode : ''}${payload.searchTxt ? '&search=' + payload.searchTxt : ''}`)
            .then(res => {
              commit('setCount', res.data.length);
              if (res.data.length > 0) commit('appendItem', res.data);
            })
  },
  async nextPage({ dispatch, commit }, payload) {
    commit('incrementPageNum');
    if (payload.searchTxt) dispatch('search', payload);
    else dispatch('findAll', payload);
  },
}

// mutations
const mutations = {
  incrementPageNum(state) {
    state.pageNum += 1;
  },
  decrementPageNum(state) {
    state.pageNum -= 1;
  },
  resetPageNum(state) {
    state.pageNum = 0;
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
  appendItem(state, payload) {
    state.items.push(...payload);
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
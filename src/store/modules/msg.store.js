// initial state
const state = () => ({
  display: false,
  msg: '',
  timeout: 2000,
  color: 'primary'
})

// getters
const getters = {
  display(state) {
    return state.display;
  },
  msg(state) {
    return state.msg;
  },
  timeout(state) {
    return state.timeout;
  },
  color(state) {
    return state.color;
  }
}

// actions
const actions = {
  showInfo({ commit }, payload) {
    commit('setColor', 'primary');
    commit('setDisplay', true);
    commit('setMsg', payload);
  },
  showErr({ commit }, payload) {
    commit('setColor', 'red');
    commit('setDisplay', true);
    commit('setMsg', payload);
  }
}

// mutations
const mutations = {
  setDisplay(state, payload) {
    state.display = payload;
  },
  setMsg(state, payload) {
    state.msg = payload;
  },
  setColor(state, payload) {
    state.color = payload;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
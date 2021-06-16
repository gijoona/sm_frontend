// initial state
const state = () => ({
  loading: false
})

// getters
const getters = {
  loading(state) {
    return state.loading;
  }
}

// actions
const actions = {}

// mutations
const mutations = {
  enable(state) {
    state.loading = true;
  },
  disable(state) {
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
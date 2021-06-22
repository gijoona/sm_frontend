import instance from './../../plugins/axios'

// initial state
const state = () => ({
  id: 1,
  type: 'KOR',
  langs: []
})

// getters
const getters = {
  id(state) {
    return state.id;
  },
  type(state) {
    return state.type;
  },
  langs(state) {
    return state.langs;
  }
}

// actions
const actions = {
  async find({ commit, state }) {
    await instance
            .get(`/lang/find?mid=${state.id}&type=${state.type}`)
            .then(res => {
              console.log(res.data.slaves);
              if (res.data.length > 0) commit('setLangs', res.data.slaves);
            })
  }
}

// mutations
const mutations = {
  setId(state, payload) {
    state.id = payload;
  },
  setType(state, payload) {
    state.type = payload;
  },
  setLangs(state, payload) {
    state.langs = payload;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
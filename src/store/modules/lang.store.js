import instance from './../../plugins/axios'

// initial state
const state = () => ({
  id: 1,
  type: 'ENG',
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
              if (res.data.slaves) commit('setLangs', res.data.slaves);
            })
  },
  async getText({ state }, payload) {
    console.log(state.langs);
    const word = state.langs.find(lang => lang.code === payload);
    return word ? word.text : payload;
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
  },
  setCode(state, payload) {
    state.code = payload;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
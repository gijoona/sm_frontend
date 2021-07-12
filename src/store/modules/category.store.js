import instance from './../../plugins/axios'

// initial state
const state = () => ({
  code: '',
  name: '부식',
  categorys: []
})

// getters
const getters = {
  categorys(state) {
    return state.categorys;
  },
  code(state) {
    return state.code;
  },
  name(state) {
    return state.name;
  }
}

// actions
const actions = {
  async findAll({ commit }) {
    await instance
            .get('/category/findAll')
            .then(res => {
              if (res.data.length > 0) commit('setCategorys', res.data);
            })
  },
  async findCompanyList(obj, payload) {
    return await instance
            .get(`/category/findCompanyList/${payload}`)
            .then(res => { return res.data; })
  }
}

// mutations
const mutations = {
  setCategorys(state, payload) {
    state.categorys = payload;
  },
  setCategoryCode(state, payload) {
    state.code = payload;
  },
  setCategoryName(state, payload) {
    state.name = payload;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
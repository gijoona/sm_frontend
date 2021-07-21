import instance from './../../plugins/axios'

// initial state
const state = () => ({
  pageNum: 0,
  limit: 15,
  total: 0,
  loading: false,
  cartList: [],
  carts: [],
  cartId: 0,
  isShowDialog: false,
  selectedItem: [],
  cartInfo: {}
})

// getters
const getters = {
  cartList(state) {
    return state.cartList;
  },
  carts(state) {
    return state.carts;
  },
  cartId(state) {
    return state.cartId;
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
  },
  isShowDialog(state) {
    return state.isShowDialog;
  },
  selectedItem(state) {
    return state.selectedItem;
  },
  cartCategorys(state) {
    return [...new Set(state.carts.map(cart => cart.itemCd.substring(0, 2)).sort())];
  },
  cartInfo(state) {
    return state.cartInfo;
  }
}

// actions
const actions = {
  async findCarts({ commit, rootGetters }) {
    commit('loading/enable', {}, { root: true });

    const { code } = rootGetters['user/userinfo'];
    await instance
            .get(`/cart/findCartList/${code}`)
            .then(res => {
              commit('setCartList', res.data);
              commit('loading/disable', {}, { root: true });
            })
  },
  async addCart({ dispatch, commit, rootGetters }) {
    const { code } = rootGetters['user/userinfo'];
    const cart = { userCd: code };

    return await instance
            .post('/cart/add', cart)
            .then((res) => {
              dispatch('msg/showInfo', '항목 저장되었습니다.', { root: true });
              commit('setCartInfo', res.data);
              commit('loading/disable', {}, { root: true });
            })
            .finally(() => dispatch('findCarts'))
  },
  async saveCart({ dispatch, commit }, payload) {
    commit('loading/enable', {}, { root: true });

    await instance
            .patch('/cart/update', payload.cart)
            .then(() => {
              commit('setCartInfo', payload.cart);
              dispatch('msg/showInfo', '항목 저장되었습니다.', { root: true });
              commit('loading/disable', {}, { root: true });
            })
            .finally(() => dispatch('findCarts'))
  },
  async removeCart({ dispatch, commit }, payload) {
    commit('loading/enable', {}, { root: true });

    await instance
            .delete(`/cart/remove/${payload}`)
            .then(() => {
              dispatch('msg/showInfo', '항목이 삭제되었습니다.', { root: true });
              commit('loading/disable', {}, { root: true });
            })
            .finally(() => dispatch('findCarts'))
  },

  async findAll({ commit, state }) {
    commit('enableLoading');

    await instance
            .get(`/users/carts/${state.cartInfo.id}?page=${state.pageNum}&limit=${state.limit}`)
            .then(res => {
              commit('setCarts', res.data.rows);
              commit('setTotal', res.data.count);
              commit('disableLoading');
            })
            .catch(() => {
              commit('disableLoading');
            })
  },
  async searchCart({ commit, state }, payload) {
    commit('enableLoading');

    await instance
            .post(`/users/carts/${state.cartInfo.id}`, {
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
  async addCartItem({ dispatch, commit, state }, payload) {
    commit('loading/enable', {}, { root: true });
    
    const cartItem = {
      cartId: state.cartInfo.id,
      itemCd: payload.code,
      quantity: payload.quantity || 1
    };
    
    await instance
            .post('/cart/addItem', cartItem)
            .then(() => {
              dispatch('msg/showInfo', '제품이 카트에 추가되었습니다.', { root: true });
              commit('loading/disable', {}, { root: true });
            })
            .catch(() => {
              commit('loading/disable', {}, { root: true });
            });
  },
  async updateCartItem({ dispatch }, payload) { 
    await instance
            .patch(`/cart/updateItem`, payload)
            .then(() => {
              dispatch('msg/showInfo', '수량이 변경되었습니다.', { root: true });
              dispatch('findAll');
            });
  },
  async removeCartItem({ dispatch }, payload) {
    await instance
            .delete(`/cart/removeItem/${payload}`)
            .then(() => {
              dispatch('msg/showInfo', '항목이 삭제되었습니다.', { root: true });
              dispatch('findAll');
            })
  },
  async removeCartItems({ dispatch, commit }, payload) {
    commit('loading/enable', {}, { root: true });

    await instance
            .post('/cart/removeItems',{
              cartItems: payload
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
  setCartList(state, payload) {
    state.cartList = payload;
  },
  setCarts(state, payload) {
    state.carts = payload;
  },
  setCartId(state, payload) {
    state.cartId = payload;
  },
  setTotal(state, payload) {
    state.total = payload;
  },
  setPageNum(state, payload) {
    state.pageNum = payload;
  },
  setLimit(state, payload) {
    state.limit = payload === -1 ? state.total : payload;
  },
  enableLoading(state) {
    state.loading = true;
  },
  disableLoading(state) {
    state.loading = false;
  },
  visibleDetail(state, payload) {
    state.isShowDialog = true;
    state.selectedItem = payload;
  },
  hideDetail(state) {
    state.isShowDialog = false;
    state.selectedItem = {};
  },
  updatedItem(state, payload) {
    state.selectedItem = payload;
  },
  setCartInfo(state, payload) {
    state.cartInfo = payload;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
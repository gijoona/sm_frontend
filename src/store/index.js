import Vue from 'vue'
import Vuex from 'vuex'
import category from './modules/category.store'
import item from './modules/item.store'
import user from './modules/user.store'
import cart from './modules/cart.store'
import msg from './modules/msg.store'
import loading from './modules/loading.store'
import lang from './modules/lang.store'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    item,
    category,
    user,
    cart,
    msg,
    loading,
    lang
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []
})
import instance from './../../plugins/axios'

// initial state
const state = () => ({})

// getters
const getters = {}

// actions
const actions = {
  async writeLog(obj, payload) {
    const { url, data } = payload;
    const [ , type, action ] = url.split("/")
    const defaultData = { type: '', action: '', keyword: '', data: JSON.stringify(payload) };
    let logData = {};
    let isWrite = false;
    switch(type) {
      case 'auth':
        if (action.includes('login')) {
          isWrite = true;
          logData = { ...defaultData, ...{ type: 'user', action: 'login', keyword: data.username }};
        }
        break;
      case 'users':
        if (action.includes('create')) {
          isWrite = true;
          logData = { ...defaultData, ...{ type: 'user', action: 'join', keyword: data.id }};
        }
        break;
      case 'items':
        if (action.includes('search'))  {
          // 검색어를 입력해서 조회할 경우에만 로그를 남김
          isWrite = true;
          logData = { ...defaultData, ...{ type: 'product', action: 'search', keyword: action.split('search=')[1] }};
        }
        break;
      case 'cart':
        if (action.includes('add')) {
          isWrite = true;
          logData = { ...defaultData, ...{ type: 'cart', action: 'add', keyword: data.itemCd }};
        }
        break;
      default:
    }
    
    if(isWrite) instance.post('logs/create', logData);
  }
}

// mutations
const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
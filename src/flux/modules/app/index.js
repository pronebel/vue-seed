import * as types from './types'

export default {

  state: {
    isLoading: false,
    scrollTop: 0,
    isKeepAlive: false
  },
  mutations: {
    [types.UPDATE_LOADING] (state, status) {
      state.isLoading = status
    },
    [types.UPDATE_SCROLL_TOP] (state, scrollTop) {
      state.scrollTop = scrollTop
    },
    [types.UPDATE_STATE_ALIVE] (state, status) {
      state.isKeepAlive = status
    }

  },
  actions: {},
  getters: {

    scrollTop: state => {
      return state.scrollTop
    }
  }

}

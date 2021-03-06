import Vue from 'vue'
import Vuex from 'vuex'

import storeApp from './modules/app/index'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    app: storeApp
  }

})

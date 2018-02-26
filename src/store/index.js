import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import checkMetadataValidity from './checkMetadataValidity.plugin'

Vue.use(Vuex)

import tableReducer from './modules/table'

const store = new Vuex.Store({
  modules: {
    table: tableReducer
  },
  plugins: [
    createPersistedState({
      paths: ['table.version', 'table.columns']
    }),
    checkMetadataValidity
  ]
})

export default store

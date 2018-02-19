import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

import tableReducer from './modules/table'

const checkMetadataValidity = store => {
  const watchedStores = ['table']
  store.subscribe(mutation => {
    watchedStores.map(watchedStore => {
      if (mutation.type === `${watchedStore}/setObsoleteMetadata` && mutation.payload === true) {
        console.log('detected mutation obsolete metadata')
        store.dispatch('table/fetchMetadata')
          .then(() => store.dispatch('table/fetchData'))
      }
    })
  })
}

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

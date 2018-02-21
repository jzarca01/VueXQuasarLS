import axios from 'axios'

import * as metaData1 from '../../mocks/metadata1.json'
import * as metaData2 from '../../mocks/metadata2.json'

const fetchItems = (url) => {
  return axios({
    method: 'GET',
    url: url,
    responseType: 'json'
  })
    .then(response => response.data)
    .catch(err => console.log('error', err))
}

const mockGetMetadata = (version) => {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      if (parseInt(version) === parseInt(metaData2.version)) {
        resolve([])
      }
      else if (version === null) {
        resolve({...metaData1})
      }
      else {
        resolve({...metaData2})
      }
    }, 2000)
  })
}

const mockPostData = async (version) => {
  return new Promise((resolve, reject) => {
    setTimeout(async function () {
      console.log('post data version', parseInt(version))
      console.log('post data version', parseInt(metaData2.version))
      console.log('isEqual', parseInt(version) === parseInt(metaData2.version))

      if (parseInt(version) === parseInt(metaData2.version)) {
        resolve({ data: await fetchItems('http://jsonplaceholder.typicode.com/posts') })
      }
      else {
        resolve({ error: 'isObsolete' })
      }
    }, 2000)
  })
}

export default {
  namespaced: true,

  state: {
    version: null,
    columns: [],
    items: [],
    toggleEdit: false,
    toggleLoading: false,
    isObsolete: false
  },
  mutations: {
    setMetadataVersion (state, payload) {
      console.log('payload', payload)
      state.version = payload.version
      return state
    },
    resetColumns (state) {
      state.columns = []
    },
    setColumns (state, payload) {
      console.log(payload.columns)
      payload.columns.map(column => state.columns.push(column))
      return state
    },
    addItem (state, payload) {
      state.items.push(payload.item)
      return state
    },
    deleteItem (state, item) {
      state.items = state.items.filter(e => e !== item)
      return state
    },
    toggleEdit (state, isEdit) {
      state.toggleEdit = isEdit
      return state
    },
    toggleLoading (state, isLoading) {
      state.toggleLoading = isLoading
      return state
    },
    setObsoleteMetadata (state, isObsolete) {
      state.isObsolete = isObsolete
      return state
    }
  },
  actions: {
    async fetchMetadata (context) {
      const metaDataVersion = context.state.version
      try {
        await context.commit('toggleLoading', true)
        const response = await mockGetMetadata(metaDataVersion)
        console.log('fetch metadata response', response)
        if (response.version) {
          await context.commit('setMetadataVersion', {
            version: response.version
          })
        }
        if (response.sections) {
          const data = response.sections[0]
          await context.commit('setColumns', {
            columns: data.fields
          })
        }
        await context.commit('toggleLoading', false)
      }
      catch (err) {
        console.log('err fetchmetadata', err)
      }
    },
    async fetchData (context) {
      const metaDataVersion = context.state.version
      console.log('state version', metaDataVersion)
      try {
        await context.commit('toggleLoading', true)
        const response = await mockPostData(metaDataVersion)
        console.log('fetch data response', response)
        if (response.error === 'isObsolete') {
          await context.commit('resetColumns')
          await context.commit('setObsoleteMetadata', true)
        }
        else {
          await context.commit('setObsoleteMetadata', false)
          response.data.map(item => context.commit('addItem', {
            item: item
          }))
        }
        await context.commit('toggleLoading', false)
      }
      catch (err) {
        console.log('err fetchdata', err)
      }
    }
  },
  getters: {
    getState: state => {
      return state
    },
    getMetadata: state => {
      return state.version
    }
  }
}

import { fetchItems, fetchMetadata } from '../../common/requests'

/*
import * as metaData1 from '../../mocks/metadata1.json'
import * as metaData2 from '../../mocks/metadata2.json'

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
      if (parseInt(version) === parseInt(metaData2.version)) {
        resolve({ data: await fetchItems('http://jsonplaceholder.typicode.com/posts') })
      }
      else {
        resolve({ error: 'isObsolete' })
      }
    }, 2000)
  })
}
*/

const transformMetadata = (metadata) => {
  let result = []
  const keys = Object.keys(metadata)
  const values = Object.values(metadata)
  for (let i = 0; i < keys.length; i++) {
    result.push({
      field: keys[i],
      label: keys[i],
      type: values[i].type
    })
  }
  return result
}

export default {
  namespaced: true,

  state: {
    version: 0,
    columns: [],
    items: [],
    toggleEdit: false,
    toggleLoading: false,
    isObsolete: false
  },
  mutations: {
    setMetadataVersion (state, payload) {
      state.version = payload.version
      return state
    },
    resetColumns (state) {
      state.columns = []
    },
    setColumns (state, payload) {
      payload.columns.map(column => state.columns.push(column))
      return state
    },
    addItem (state, payload) {
      state.items.push(payload.item)
      return state
    },
    deleteItem (state, payload) {
      state.items = state.items.filter(e => e !== payload.item)
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
      try {
        await context.commit('toggleLoading', true)
        const response = await fetchMetadata('somerandomurl')
        console.log(response)
        if (response.properties) {
          const props = transformMetadata(response.properties.items.items.properties)
          console.log('props', props)

          await context.commit('setColumns', {
            columns: props
          })
        }
      }
      /*
      const metaDataVersion = context.state.version
      try {
        await context.commit('toggleLoading', true)
        const response = await mockGetMetadata(metaDataVersion)
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
      */
      catch (err) {
        console.log('err fetchmetadata', err)
      }
    },
    async fetchData (context) {
      try {
        await context.commit('toggleLoading', true)
        const response = await fetchItems('somerandomurl')
        response.items.map(item => context.commit('addItem', {
          item: item
        }))
        if (response.version) {
          await context.commit('setMetadataVersion', {
            version: response.version
          })
        }
        await context.commit('toggleLoading', false)
      }

      /* const metaDataVersion = context.state.version
      try {
        await context.commit('toggleLoading', true)
        const response = await mockPostData(metaDataVersion)
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
      } */
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

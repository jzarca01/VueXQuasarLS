import { createLocalVue } from '@vue/test-utils'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import * as Vuex from 'vuex'

import checkMetadataValidity from './checkMetadataValidity.plugin'

chai.use(sinonChai)

const localVue = createLocalVue()
localVue.use(Vuex)

const mockSetObsoleteMetadata = () => {
  return {
    version: 1,
    columns: [],
    items: [],
    toggleEdit: false,
    toggleLoading: false,
    isObsolete: true
  }
}

describe('Store: checkMetadataValidity plugin', () => {
  let store
  let actions
  let getters
  let mutations

  let fetchMetadataStub
  let fetchDataStub

  fetchMetadataStub = sinon.stub()
  fetchDataStub = sinon.stub()
  actions = {
    fetchMetadata: fetchMetadataStub,
    fetchData: fetchDataStub
  }
  mutations = {
    setObsoleteMetadata: mockSetObsoleteMetadata
  }
  getters = {
    getState: state => state,
    getColumns: state => state.columns
  }
  beforeEach(() => {
    fetchDataStub.reset()
    fetchMetadataStub.reset()
    store = new Vuex.Store({
      modules: {
        table: {
          namespaced: true,
          state: {
            version: 1,
            columns: [],
            items: [],
            toggleEdit: false,
            toggleLoading: false,
            isObsolete: false
          },
          mutations: mutations,
          actions: actions,
          getters: getters
        }
      },
      plugins: [
        checkMetadataValidity
      ]
    })
  })

  it('should dispatch fetchMetadata, then dispatch fetchData when metadatas are obsolete', async () => {
    await store.commit('table/setObsoleteMetadata', true)
    expect(actions.fetchMetadata).to.have.been.calledOnce
    expect(actions.fetchData).to.have.been.calledAfter(actions.fetchMetadata)
  })

  it('should do nothing when metadatas are not obsolete', async () => {
    await store.commit('table/setObsoleteMetadata', false)
    expect(actions.fetchMetadata).to.not.have.been.called
    expect(actions.fetchData).to.not.have.been.called
  })
})

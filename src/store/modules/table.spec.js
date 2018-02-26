import { createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'
import * as Vuex from 'vuex'
import store from '../'

const localVue = createLocalVue()
localVue.use(Vuex)

const mockItem = {
  userId: 1,
  id: 1,
  title: 'Test title',
  body: 'Test body'
}

describe('Store: Table module', () => {
  beforeEach(() => {
    store.replaceState({
      table: {
        version: 1,
        columns: [],
        items: [],
        toggleEdit: false,
        toggleLoading: false,
        isObsolete: false
      }
    })
  })

  describe('testing the getters', () => {
    it('should return the right state', () => {
      expect(store.getters['table/getState']).to.eql({
        version: 1,
        columns: [],
        items: [],
        toggleEdit: false,
        toggleLoading: false,
        isObsolete: false
      })
    })

    it('should return the current metadata version', () => {
      expect(store.getters['table/getMetadata']).to.eql(1)
    })
  })

  describe('testing the mutations', () => {
    beforeEach(async () => {
      await store.commit('table/addItem', { item: mockItem })
    })

    it('should have the correct version', async () => {
      await store.commit('table/setMetadataVersion', { version: 2 })
      expect(store.state.table).to.eql({
        version: 2,
        columns: [],
        items: [mockItem],
        toggleLoading: false,
        toggleEdit: false,
        isObsolete: false
      })
    })

    it('should toggle loading', async () => {
      await store.commit('table/toggleLoading', true)
      expect(store.state.table).to.eql({
        version: 1,
        columns: [],
        items: [mockItem],
        toggleLoading: true,
        toggleEdit: false,
        isObsolete: false
      })
    })

    it('should have one item', () => {
      expect(store.state.table).to.eql({
        version: 1,
        columns: [],
        items: [mockItem],
        toggleLoading: false,
        toggleEdit: false,
        isObsolete: false
      })
    })

    it('should have zero item when deleting mockItem', async () => {
      await store.commit('table/deleteItem', { item: mockItem })
      expect(store.state.table).to.eql({
        version: 1,
        columns: [],
        items: [],
        toggleLoading: false,
        toggleEdit: false,
        isObsolete: false
      })
    })
  })
})

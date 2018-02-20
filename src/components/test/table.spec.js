import sinon from 'sinon'
import { expect, assert } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import Table from '../Table.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Table.vue', () => {
  let wrapper
  let store
  let actions
  let mutations

  beforeEach(() => {
    actions = {
      fetchMetadata: sinon.stub(),
      fetchData: sinon.stub()
    }
    mutations = {
      toggleLoading: sinon.stub()
    }
    store = new Vuex.Store({
      modules: {
        table: {
          namespaced: true,
          state: {
            version: null,
            columns: [],
            items: [],
            toggleLoading: false
          },
          getters: {
            getState: state => state,
            getMetadata: state => state.version
          },
          actions: actions,
          mutations: mutations
        }
      }
    })
    wrapper = mount(Table, {
      store,
      localVue
    })
  })
  it('renders Table.vue without crashing', () => {
    expect(wrapper.contains('div')).to.be.true
  })

  it('calls getMetadata when mounted without version', () => {
    expect(actions.fetchMetadata.calledOnce).to.equal(true)
  })

  it('doesnt call getMetadata when mounted with version', () => {
    store.replaceState({
      table: {
        state: {
          version: 1
        }
      }
    })
    wrapper = mount(Table, {
      store,
      localVue
    })
    expect(actions.fetchMetadata.calledOnce).to.equal(false)
  })

  it('toggles loading when clicking on toggle loading button', () => {
    wrapper = mount(Table, {
      store,
      localVue
    })
    const loadingButton = wrapper.find({ref : "loadingButton"})
    loadingButton.trigger('click')
    expect(mutations.toggleLoading.calledOnce).to.equal(true)
  })
})


import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, createLocalVue } from '@vue/test-utils'

chai.use(sinonChai)

import Vuex from 'vuex'
import Table from '../Table.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Component: Table.vue', () => {
  let wrapper
  let store
  let actions
  let mutations
  let fetchMetaStub;
  let fetchDataStub;
  let toggleLoadingStub;
  let goToFormStub;

  beforeEach(() => {
    fetchMetaStub = sinon.stub();
    fetchDataStub = sinon.stub();
    toggleLoadingStub = sinon.stub();
    goToFormStub = sinon.stub()

    actions = {
      fetchMetadata: fetchMetaStub,
      fetchData: fetchDataStub
    }
    mutations = {
      toggleLoading: toggleLoadingStub
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
  it('should render Table.vue without crashing', () => {
    expect(wrapper.contains('div')).to.be.true
  })

  it('should call getMetadata when mounted without version', () => {
    expect(fetchMetaStub).to.have.been.calledOnce
  })

  it('should not call getMetadata when mounted with version', () => {
    fetchMetaStub.reset()
    store.replaceState({
      table: {
        version: 1
      }
    })
    wrapper = mount(Table, {
      store,
      localVue
    })
    expect(fetchMetaStub).not.to.have.been.called
  })

  it('should toggle loading when clicking on toggle loading button', () => {
    const loadingButton = wrapper.find({ref : "loadingButton"})
    loadingButton.trigger('click')
    expect(toggleLoadingStub).to.have.been.called
  })

  it('should trigger gotoForm when clicking on add post button', () => {
    wrapper.setMethods({
      gotoForm: goToFormStub
    })
    const addPostButton = wrapper.find({ref : "editButton"})
    addPostButton.trigger('click')
    expect(goToFormStub).to.have.been.called
  })
})

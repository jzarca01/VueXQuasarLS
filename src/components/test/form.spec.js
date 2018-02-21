import sinon from 'sinon'
import { expect, assert } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import Form from '../Form.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Table.vue', () => {
  let wrapper
  let store
  let getters
  let mutations
  let state

  beforeEach(() => {
    state = {
      items: [],
    },
    mutations = {
      addItem: sinon.stub()
    }
    getters = {
      getState: state => state,
      getItemsLength: state => state.items.length
    },
    store = new Vuex.Store({
      modules: {
        table: {
          namespaced: true,
          state: state,
          getters: getters,
          mutations: mutations
        }
      }
    })
    wrapper = mount(Form, {
      store,
      localVue
    })
  })
  it('renders Form.vue without crashing', () => {
    expect(wrapper.contains('div')).to.be.true
  })

  it('add an item when clicking on submitButton', () => {
    wrapper.setData({
      form: {
        id:0,
        userId:0,
        title: 'Test',
        body: 'Test'
      }
    })

    const submitButton = wrapper.find({ref : "submitButton"})
    submitButton.trigger('click')
    expect(mutations.addItem.calledOnce).to.equal(true)
  })
})

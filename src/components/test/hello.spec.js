import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
//import VueRouter from 'vue-router'

chai.use(sinonChai)

import Hello from '../Hello.vue'

//const localVue = createLocalVue()
//localVue.use(VueRouter)

describe('Component: Hello.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Hello, {
        stubs: {
            RouterLink: RouterLinkStub
        }
    })
  })

  it('should render Hello.vue without crashing', () => {
    expect(wrapper.contains('div')).to.be.true
  })

  it('should render a link to Table Component', () => {
    const tableLink = wrapper.find({ref : "tableLink"})
    expect(tableLink.text()).to.equal('Table')
    expect(tableLink.props().to).to.eql('table')
  })

  it('should render a link to Form Component', () => {
    const formLink = wrapper.find({ref : "formLink"})
    expect(formLink.text()).to.equal('Form')
    expect(formLink.props().to).to.eql({ name: 'form', params: { id: 12} })
  })
})
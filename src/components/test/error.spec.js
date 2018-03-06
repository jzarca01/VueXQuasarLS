import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'

chai.use(sinonChai)

import Error from '../Error.vue'

const localVue = createLocalVue()

describe('Component: Error.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Error, {
        stubs: {
            RouterLink: RouterLinkStub
        }
    })
  })

  it('should render Error.vue without crashing', () => {
    expect(wrapper.contains('div')).to.be.true
  })

  it('should render a link to Hello Component', () => {
    const homeLink = wrapper.find({ref : "homeLink"})
    expect(homeLink.props().to).to.eql('/')
  })
})
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, createLocalVue } from '@vue/test-utils'

chai.use(sinonChai)

import Error from '../Error.vue'

const localVue = createLocalVue()

describe('Component: Error.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Error, {
        localVue
    })
  })

  it('should render Error.vue without crashing', () => {
    expect(wrapper.contains('div')).to.be.true
  })
})
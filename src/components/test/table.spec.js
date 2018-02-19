import { assert, should } from 'chai'
import { shallow } from '@vue/test-utils'
import Table from '../Table.vue'

describe('Table.vue', () => {
  it('renders Table.vue without crashing', () => {
    const wrapper = shallow(Table)
    should.exist(wrapper)
  })
})

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1, 2, 3].indexOf(4))
    })
  })
})

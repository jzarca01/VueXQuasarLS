import MockAdapter from 'axios-mock-adapter'
import jsf from 'json-schema-faker'
jsf.extend('faker', function () {
  return require('faker')
})

import metadata from '../mocks/metadata.json'

async function resolveSchema (schema) {
  const mockItems = await jsf.resolve(schema)
  return mockItems
}

export default function createMockInstance (instance) {
  const mock = new MockAdapter(instance)
  console.log('mocked')
  mock
    .onGet('/items').reply(200, resolveSchema(metadata))
    .onGet('/metadata').reply(200, metadata)
}

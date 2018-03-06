import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
})

// #if process.env.NODE_ENV === 'development'
import createMockInstance from './requests-mocked'
createMockInstance(instance)
// #endif

export function fetchItems (url) {
  return instance.get('/items', {
    responseType: 'json'
  })
    .then(response => response.data)
    .catch(err => console.log('error', err))
}

export function fetchMetadata (url) {
  return instance.get('/metadata', {
    responseType: 'json'
  })
    .then(response => response.data)
    .catch(err => console.log('error', err))
}

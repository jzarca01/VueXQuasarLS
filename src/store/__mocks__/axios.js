const axios = {
  get: () => new Promise(res => res({ data: 'Mock with Jest' }))
}

export default axios

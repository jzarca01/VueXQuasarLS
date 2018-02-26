const checkMetadataValidity = store => {
  const watchedStores = ['table']
  store.subscribe(mutation => {
    watchedStores.map(watchedStore => {
      if (mutation.type === `${watchedStore}/setObsoleteMetadata` && mutation.payload === true) {
        console.log('detected mutation obsolete metadata')
        store.dispatch(`${watchedStore}/fetchMetadata`)
          .then(() => store.dispatch(`${watchedStore}/fetchData`))
      }
    })
  })
}

export default checkMetadataValidity

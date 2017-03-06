/* global axios */
// https://api.flickr.com/services/rest/?method=flickr.test.echo&name=value

const Flickr = (function () {
  const ENDPOINT = 'https://api.flickr.com/services/rest/'
  const API_KEY = '82f39a50a56b9f0e99fd7c6f47476502'
  const METHOD_SEARCH = 'flickr.photos.search'
  const METHOD_GETINFO = 'flickr.photos.getInfo'
  const DEFAULT_TAG = 'london'

  function _buildQuery (method, query) {
    let extras = ''
    switch (method) {
      case METHOD_SEARCH:
        if (!query) {
          query = DEFAULT_TAG
        }
        extras += 'tags='
        if (query instanceof Array) {
          extras += query.toString()
        } else {
          extras += query
        }
        break
      case METHOD_GETINFO:
        if (!query) {
          throw new Error('Missing Photo ID')
        }
        extras += `photo_id=${query}`
        break
    }
    return `${ENDPOINT}?method=${METHOD_SEARCH}&api_key=${API_KEY}&format=json&${extras}`
  }

  function fetchRecent (tags) {
    return axios.get(_buildQuery(METHOD_SEARCH, tags))
      .then(JSON.parse)
      .catch((error) => {
        console.error(error)
        return error
      })
  }

  function fetchInfo (id) {
    return axios.get(_buildQuery(METHOD_GETINFO, id))
      .then(JSON.parse)
      .catch((error) => {
        console.error(error)
        return error
      })
  }

  return {
    fetchRecent: fetchRecent,
    fetchInfo: fetchInfo
  }
})()

export { Flickr as default }

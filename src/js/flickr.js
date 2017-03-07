/* global axios */

const Flickr = (function () {
  const ENDPOINT = 'https://api.flickr.com/services/rest/'
  const API_KEY = '82f39a50a56b9f0e99fd7c6f47476502'
  const METHOD_SEARCH = 'flickr.photos.search'
  const METHOD_GETINFO = 'flickr.photos.getInfo'
  const DEFAULT_TAG = 'london'
  const P_THUMB = 'q'
  const P_MEDIUM = '-'

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
    return `${ENDPOINT}?method=${METHOD_SEARCH}&api_key=${API_KEY}&format=json&nojsoncallback=1&${extras}`
  }

  function fetchRecent (tags) {
    return axios.get(_buildQuery(METHOD_SEARCH, tags))
      .then((response) => {
        if (response.data.stat !== 'ok') {
          throw Error('Error fetching images')
        }
        return response.data.photos
      })
      .catch((error) => {
        console.error(error)
        return error
      })
  }

  function buildUrl (photoData, size) {
    let type = ''
    switch (size) {
      case 'thumbnail':
        type = P_THUMB
        break
      case 'normal':
      default:
        type = P_MEDIUM
        break
    }
    return `https://farm${photoData.farm}.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}_${type}.jpg`
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
    fetchInfo: fetchInfo,
    buildUrl: buildUrl
  }
})()

export { Flickr as default }

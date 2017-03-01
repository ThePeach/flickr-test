const Store = (function () {
  let Storage = null
  let storageKey = null

  function _getItems () {
    let items
    try {
      items = JSON.parse(Storage.getItem(storageKey))
    } catch (e) {
      if (e instanceof TypeError) {
        throw new Error('Run init to initialise the Store first')
      }
    }
    return items
  }

  /**
   * @param {String} string
   */
  function addItem (string) {
    const items = _getItems()
    if (items && items.indexOf(string) !== -1) {
      return false
    } else {
      items.push(string)
    }
    // save everything back into the storage
    Storage.setItem(storageKey, JSON.stringify(items))
  }

  /**
   * @param {String} string
   */
  function removeItem (string) {
    const items = _getItems()
    if (items && items.indexOf(string) !== -1) {
      items.splice(items.indexOf(string), 1)
    }

    Storage.setItem(storageKey, JSON.stringify(items))
  }

  /**
   * @param {String} string
   */
  function contains (string) {
    const items = _getItems()
    if (items && items.indexOf(string) !== -1) {
      return true
    }
    return false
  }

  /**
   * @param {Array} stringList
   */
  function prune (stringList) {
    const items = _getItems()
    let unused = []
    let i

    unused = items.filter(function (el) {
      return stringList.indexOf(el) === -1
    })

    for (i = 0; i < unused.length; i++) {
      items.splice(items.indexOf(unused[i]), 1)
    }

    Storage.setItem(storageKey, JSON.stringify(items))
  }

  /**
   * @param {String} key
   */
  function init (key) {
    storageKey = key
    if (window.sessionStorage) {
      Storage = window.sessionStorage
    }
    if (!window.sessionStorage.getItem(storageKey)) {
      Storage.setItem(storageKey, JSON.stringify([]))
    }
  }

  return {
    init: init,
    addItem: addItem,
    removeItem: removeItem,
    contains: contains,
    prune: prune
  }
})()

if (typeof module !== 'undefined') {
  module.exports = Store
}

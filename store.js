const Store = (function () {
  let Storage = null
  let storageKey = null

  /**
   * @param {String} string
   */
  function addItem (string) {
    const items = JSON.parse(Storage.getItem(storageKey))
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
    const items = JSON.parse(Storage.getItem(storageKey))
    if (items && items.indexOf(string) !== -1) {
      items.splice(items.indexOf(string), 1)
    }

    Storage.setItem(storageKey, JSON.stringify(items))
  }

  /**
   * @param {String} string
   */
  function inStore (string) {
    const items = JSON.parse(Storage.getItem(storageKey))
    if (items && items.indexOf(string) !== -1) {
      return true
    }
    return false
  }

  /**
   * @param {Array} stringList
   */
  function prune (stringList) {
    const items = JSON.parse(Storage.getItem(storageKey))
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
    inStore: inStore,
    prune: prune
  }
})()

if (typeof module !== 'undefined') {
  module.exports = Store
}

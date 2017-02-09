var STORE = (function () {
  let Storage = null
  let storageKey = null

  function addItem (string) {
    const items = JSON.parse(Storage.getItem(storageKey))
    if (string in items) {
      return false
    } else {
      items.push(string)
    }
    // save everything back into the storage
    Storage.setItem(storageKey, JSON.stringify(items))
  }

  function removeItem (string) {
    const items = JSON.parse(Storage.getItem(storageKey))
    if (string in items) {
      items.splice(items.indexOf(string), 1)
    }

    Storage.setItem(storageKey, JSON.stringify(items))
  }

  function inStore (string) {
    const items = JSON.parse(Storage.getItem(storageKey))
    if (string in items) {
      return true
    }
    return false
  }

  function init (key) {
    if (window.sessionStorage) {
      Storage = window.sessionStorage
      storageKey = key
    }
  }

  return {
    init: init,
    addItem: addItem,
    removeItem: removeItem,
    inStore: inStore
  }
})()

module.exports()

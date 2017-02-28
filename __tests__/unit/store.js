/* global jest test expect beforeEach */
const Store = require('../../js/store')

beforeEach(() => {
  window.sessionStorage = {}
  window.sessionStorage.getItem = jest.fn()
  window.sessionStorage.setItem = jest.fn()
  window.sessionStorage.removeItem = jest.fn()
})

test('Store is an available object', () => {
  expect(Store).toBeDefined()
})

test('init() will call setItem to initialise the session', () => {
  Store.init('test')
  expect(window.sessionStorage.getItem).toBeCalled()
  expect(window.sessionStorage.setItem).toBeCalled()
})

test('addItem() will throw an Error if it has not been initialised', () => {
  expect(() => {
    Store.addItem('test')
  }).toThrow()
})

test('addItem() will call sessionStorage.setItem', () => {
  window.sessionStorage.getItem = jest.fn((string) => { return '[]' })
  Store.init('test')
  Store.addItem('item')
  expect(window.sessionStorage.getItem).toBeCalled()
  expect(window.sessionStorage.setItem).toBeCalled()
})

test('addItem() will return false if there is an already available item in the store', () => {
  var item = 'string'
  window.sessionStorage.getItem = jest.fn((string) => { return JSON.stringify([item]) })
  Store.init('test')
  expect(Store.addItem(item)).toBeFalsy()
  expect(window.sessionStorage.getItem).toBeCalled()
})

test('removeItem() will not remove anything if the item is not found', () => {
  var item = 'string'
  var key = 'test'
  window.sessionStorage.getItem = jest.fn((string) => { return JSON.stringify([]) })
  Store.init(key)
  Store.removeItem(item)
  expect(window.sessionStorage.getItem).toBeCalled()
  expect(window.sessionStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify([]))
})

test('removeItem() will remove the item if found', () => {
  var item = 'string'
  var key = 'test'
  window.sessionStorage.getItem = jest.fn((string) => { return JSON.stringify([item]) })
  Store.init(key)
  Store.removeItem(item)
  expect(window.sessionStorage.getItem).toBeCalled()
  expect(window.sessionStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify([]))
})

test('contains() will return true if the item is found', () => {
  var item = 'string'
  var key = 'test'
  window.sessionStorage.getItem = jest.fn((string) => { return JSON.stringify([item]) })
  Store.init(key)
  expect(Store.contains(item)).toBeTruthy()
})

test('contains() will return false if the item is not found', () => {
  var item = 'string'
  var key = 'test'
  window.sessionStorage.getItem = jest.fn((string) => { return JSON.stringify([]) })
  Store.init(key)
  expect(Store.contains(item)).toBeFalsy()
})

test('prune() will remove any item not in the passed list', () => {
  const itemToKeep = 'three'
  const actualList = ['one', 'two', itemToKeep]
  const key = 'test'
  window.sessionStorage.getItem = jest.fn((string) => { return JSON.stringify(actualList) })
  Store.init(key)
  Store.prune([itemToKeep])
  expect(window.sessionStorage.setItem).toBeCalledWith(key, JSON.stringify([itemToKeep]))
})

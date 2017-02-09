/* global test expect */
const Store = require('../store')

test('Store is an available object', () => {
  expect(Store).toBeDefined()
})

test('Store contains the required methods', () => {
  expect(Store.init).toBeDefined()
})

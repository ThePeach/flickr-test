/* global Helper */
'use strict'
const assert = require('assert')

class DOMElements extends Helper {

  seeMoreThanElements (locator, count) {
    return this.helpers['Nightmare']._locate(locator)
      .then((elementsArray) => {
        if (elementsArray.length < count) {
          return assert.fail(elementsArray.length, count, `Found more than ${count} elements`)
        }
      })
  }

  countElements (locator) {
    return this.helpers['Nightmare']._locate(locator)
      .then((elementsArray) => {
        return elementsArray.length
      })
  }
}

module.exports = DOMElements

/* global Helper */
'use strict'
let assert = require('assert')

class DOMElements extends Helper {

  seeMoreThanElements (locator, count) {
    this.helpers['Nightmare']._locate(locator).then((els) => {
      if (els.length < count) {
        assert.fail(els.length, count, `Found more than ${count} elements`)
      }
    })
  }
}

module.exports = DOMElements

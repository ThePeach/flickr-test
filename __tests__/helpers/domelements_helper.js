/* global Helper */
'use strict'
let assert = require('assert')

class DOMElements extends Helper {
  seeMoreThanElements (locator, count) {
    return this.helpers['Nightmare']._locate(locator).then(function (els) {
      try {
        assert(els.length >= count, `Found more than ${count} elements`)
      } catch (e) {
        return false
      }
    })
  }

  clickRandom (locator) {

  }
}

module.exports = DOMElements

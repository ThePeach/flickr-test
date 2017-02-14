/* global Helper */
'use strict'
let assert = require('assert')

class DOMElements extends Helper {
  seeMoreThanElements (locator, count) {
    this.helpers['Nightmare']._locate(locator).then(function (els) {
      return assert(els.length >= count, `Found more than ${count} elements`)
    })
  }

  clickRandom (locator) {
    // @TODO
  }
}

module.exports = DOMElements

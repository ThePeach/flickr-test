/* global Feature Scenario */
Feature('gallery')

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

Scenario('test gallery is displayed', (I) => {
  I.amOnPage('/')
  I.see('Flick London Gallery', 'h1')
  I.seeElement('#gallery .col-md-3')
})

Scenario('selecting an element adds "selected" class', function * (I) {
  I.amOnPage('/')
  I.see('Flick London Gallery', 'h1')
  I.seeElement('#gallery .col-md-3')
  I.seeMoreThanElements('#gallery .col-md-3', 1)
  I.dontSeeElement('#gallery .selected')
  const elementsCount = yield I.countElements('#gallery .col-md-3')
  const randomElNumber = getRandomInt(1, elementsCount)
  I.click(`//div[@id="gallery"]//div[@class="col-md-3"][${randomElNumber}]`)
  I.seeElement('#gallery .selected')
})

Scenario('selecting a selected element will remove the "selected" class', (I) => {
  I.amOnPage('/')
  I.seeElement('#gallery .col-md-3')
  I.dontSeeElement('#gallery .selected')
  I.click('#gallery .col-md-3')
  I.seeElement('#gallery .selected')
  I.click('#gallery .selected')
  I.dontSeeElement('#gallery .selected')
})

/* global Feature Scenario */
Feature('gallery')

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

Scenario('test gallery is displayed', (I) => {
  I.amOnPage('/')
  I.see('Flick London Gallery', 'h1')
  I.seeElement('#gallery .gallery_item')
})

Scenario('selecting an element adds "selected" class', function * (I) {
  I.amOnPage('/')
  I.see('Flick London Gallery', 'h1')
  I.seeElement('#gallery .gallery_item')
  I.seeMoreThanElements('#gallery .gallery_item', 1)
  I.dontSeeElement('#gallery .is-selected')
  const elementsCount = yield I.countElements('#gallery .gallery_item')
  const randomElNumber = getRandomInt(1, elementsCount)
  I.click(`//div[@id="gallery"]//div[@class="gallery_item"][${randomElNumber}]`)
  I.seeElement('#gallery .is-selected')
})

Scenario('selecting a selected element will remove the "selected" class', (I) => {
  I.amOnPage('/')
  I.seeElement('#gallery .gallery_item')
  I.dontSeeElement('#gallery .is-selected')
  I.click('#gallery .gallery_item')
  I.seeElement('#gallery .is-selected')
  I.click('#gallery .is-selected')
  I.dontSeeElement('#gallery .is-selected')
})

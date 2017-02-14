/* global Feature Scenario */
Feature('gallery')

Scenario('test gallery is displayed', (I) => {
  I.amOnPage('/')
  I.see('Flick London Gallery', 'h1')
  I.seeElement('#gallery .col-md-3')
})

Scenario('selecting an element adds "selected" class', (I) => {
  I.amOnPage('/')
  I.seeElement('#gallery .col-md-3')
  I.click('#gallery .col-md-3')
  I.seeElement('#gallery .selected')
})

Scenario('selecting a selected element will remove the "selected" class', (I) => {
  I.amOnPage('/')
  I.seeElement('#gallery .col-md-3')
  I.click('#gallery .col-md-3')
  I.seeElement('#gallery .selected')
  I.click('#gallery .selected')
  I.dontSeeElement('#gallery .selected')
})

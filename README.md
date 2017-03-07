# flickr-test

A testing bed to improve an existing test and make it work as it should.

## What is being done here?

This is an enhanced version of a previously developed test.

It's now been enhanced with:

- [BrowserSync](https://www.browsersync.io)
- ES6 syntax (checked with `eslint`)
- Promises for asynchronous calls.
- [Rollup](http://rollupjs.org) for treeshaking and concatenation
- [Babel](https://babeljs.io/) transpilation (as Rollup plugin)
- A _very-simple_ [Flickr API](https://www.flickr.com/services/api/) interface
- Unit tests using [Jest](https://facebook.github.io/jest)
- Acceptance tests using [CodeceptJs](https://github.com/codeception/codeceptjs/) and [NightmareJs](http://www.nightmarejs.org/)
- [Susy](http://susy.oddbird.net) as basic SASS framework

## Do you want to run it?

Be my guest:
- `git clone` the whole thing
- `npm install` all the deps
- `gulp serve` to build and serve it

Running the tests is similarly simple:
- `npm run test` for the unit tests
- `npm run codeceptjs run` to run the acceptance tests (*be sure to run `gulp serve` in another console*)

**NOTE**
Jest currently doesn't play well with Rollup and Babel, so you have to temporarly remove `modules` line from the `.babelrc` file in order to run the unit tests successfully.

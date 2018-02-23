# function-with-timeout [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![javascript style guide][standard-image]][standard-url]

[![Greenkeeper badge](https://badges.greenkeeper.io/feross/function-with-timeout.svg)](https://greenkeeper.io/)

[travis-image]: https://img.shields.io/travis/feross/function-with-timeout/master.svg
[travis-url]: https://travis-ci.org/feross/function-with-timeout
[npm-image]: https://img.shields.io/npm/v/function-with-timeout.svg
[npm-url]: https://npmjs.org/package/function-with-timeout
[downloads-image]: https://img.shields.io/npm/dm/function-with-timeout.svg
[downloads-url]: https://npmjs.org/package/function-with-timeout
[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard-url]: https://standardjs.com

### Ensure a function is always called within a timeout period

Accepts a function as input and returns a new function. If the returned function is
called before the timeout period (the default timeout is one second), it clears
the timeout and invokes the input function. If the returned function isn't called
before the timeout period, the input function is called regardless.

[![Sauce Test Status](https://saucelabs.com/browser-matrix/function-w-timeout.svg)](https://saucelabs.com/u/function-w-timeout)

Works in the browser, with [browserify](http://browserify.org/)! Module development sponsored by [Study Notes](https://www.apstudynotes.org).

## install

```
npm install function-with-timeout
```

## usage

Say you're using Google Analytics and you want to send a beacon when a form is
submitted. The problem is that in most browsers, XHR requests are canceled when the
page is unloaded, which will happen on form submission. So, we want to block the
page navigation to give time for the beacon to be sent.

But we also don't want the form submit to fail if the Analytics server never responds
or the library fails to load.

Here's what we can do:

```js
var functionWithTimeout = require('function-with-timeout')

form.addEventListener('submit', function (event) {
  // prevent form submission
  event.preventDefault()

  // send analytics beacon
  ga('send', 'event', 'Signup Form', 'submit', {
    // submit the form when beacon request is sent or 1000ms has elapsed,
    // whichever comes first
    hitCallback: functionWithTimeout(function () {
      form.submit()
    })
  })
})
```

## license

MIT. Copyright (c) [Feross Aboukhadijeh](http://feross.org).

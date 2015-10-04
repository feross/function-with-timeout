var functionWithTimeout = require('../')
var test = require('tape')

test('function never gets called manually', function (t) {
  t.plan(1)
  var d = Date.now()
  function myFn () {
    t.ok(Date.now() >= d + 1000)
  }
  functionWithTimeout(myFn)
})

test('function gets called before timeout', function (t) {
  t.plan(1)
  var d = Date.now()
  function myFn () {
    t.ok(Date.now() <= d + 1000)
  }
  var fn = functionWithTimeout(myFn)
  setTimeout(fn, 100)
})

test('function gets called after timeout', function (t) {
  t.plan(1)
  var d = Date.now()
  function myFn () {
    t.ok(Date.now() >= d + 1000 && Date.now() < d + 1500)
  }
  var fn = functionWithTimeout(myFn)
  setTimeout(fn, 1500)
})

test('function gets called before timeout (custom timeout)', function (t) {
  t.plan(1)
  var d = Date.now()
  function myFn () {
    t.ok(Date.now() <= d + 200)
  }
  var fn = functionWithTimeout(myFn, 200)
  setTimeout(fn, 100)
})

test('function gets called after timeout (custom timeout)', function (t) {
  t.plan(1)
  var d = Date.now()
  function myFn () {
    t.ok(Date.now() >= d + 200 && Date.now() < d + 300)
  }
  var fn = functionWithTimeout(myFn, 200)
  setTimeout(fn, 300)
})

var functionWithTimeout = require('../')
var test = require('tape')

test('function never gets called manually', function (t) {
  t.plan(1)
  var d = Date.now()
  function myFn () {
    var elapsed = Date.now() - d
    t.ok(elapsed >= 1000)
  }
  functionWithTimeout(myFn)
})

test('function gets called before timeout', function (t) {
  t.plan(2)
  var d = Date.now()
  function myFn () {
    var elapsed = Date.now() - d
    t.ok(elapsed >= 100)
    t.ok(elapsed < 1000)
  }
  var fn = functionWithTimeout(myFn)
  setTimeout(fn, 100)
})

test('function gets called after timeout', function (t) {
  t.plan(2)
  var d = Date.now()
  function myFn () {
    var elapsed = Date.now() - d
    t.ok(elapsed >= 1000)
    t.ok(elapsed < 1500)
  }
  var fn = functionWithTimeout(myFn)
  setTimeout(fn, 1500)
})

test('function gets called before timeout (custom timeout)', function (t) {
  t.plan(2)
  var d = Date.now()
  function myFn () {
    var elapsed = Date.now() - d
    t.ok(elapsed >= 100)
    t.ok(elapsed < 200)
  }
  var fn = functionWithTimeout(myFn, 200)
  setTimeout(fn, 100)
})

test('function gets called after timeout (custom timeout)', function (t) {
  t.plan(2)
  var d = Date.now()
  function myFn () {
    var elapsed = Date.now() - d
    t.ok(elapsed >= 500)
    t.ok(elapsed < 20 * 1000)
    console.log(elapsed)
  }
  var fn = functionWithTimeout(myFn, 500)
  setTimeout(fn, 1000)
})

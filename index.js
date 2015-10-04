module.exports = function functionWithTimeout (cb, timeout) {
  var called = false
  var fn = function () {
    if (!called) {
      called = true
      cb()
    }
  }
  setTimeout(fn, timeout || 1000)
  return fn
}

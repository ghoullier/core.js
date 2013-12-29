describe('core#string', function() {
  var string = require('../../core/string')
  describe('#startsWith', function() {
    it('String should have a method startsWith', function() {
      assert('function' === typeof String.prototype.startsWith, 'Missing startsWith function in String.prototype')
    })
  })
  describe('#firstUpperCase', function() {
    it('String transform the first letter of a string', function() {
      assert('Function' === string.firstUpperCase('function'), 'First char is not modified')
    })
    it('String transform work an empty string', function() {
      assert('' === string.firstUpperCase(''), 'First char is not modified')
    })
    it('String transform work a null value', function() {
      assert(null === string.firstUpperCase(null), 'First char is not modified')
    })
  })
})

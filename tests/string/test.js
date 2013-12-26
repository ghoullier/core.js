describe('core#string', function() {
  describe('#startsWith', function() {
    it('String should have a method startsWith', function() {
      assert('function' === typeof String.prototype.startsWith, 'Missing startsWith function in String.prototype')
    })
  })
  describe('#firstUpperCase', function() {
    it('String transform the first letter of a string', function() {
      assert('Function' === core.string.firstUpperCase('function'), 'First char is not modified')
    })
    it('String transform work an empty string', function() {
      assert('' === core.string.firstUpperCase(''), 'First char is not modified')
    })
    it('String transform work a null value', function() {
      assert(null === core.string.firstUpperCase(null), 'First char is not modified')
    })
  })
})

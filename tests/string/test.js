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
  describe('#precompile', function() {
    it('Precompile a template with array arguments', function() {
      var template = '{{0}} to {{1}}'
        , args = ['Hello', 'you']
      assert('Hello to you' === core.string.precompile(template, args), 'Incorrect precompile return')
    })
    it('Precompile a template with object arguments', function() {
      var template = '{{hello}} {{name.first}} {{name.last}}'
        , args = {
          hello: 'Hello',
          name: {
            first: 'Grégory',
            last: 'Houllier'
          }
        }
      assert('Hello Grégory Houllier' === core.string.precompile(template, args), 'Incorrect precompile return')
    })
  })
})

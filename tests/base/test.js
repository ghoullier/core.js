var utils = require('../../core/utils')

describe('utils', function() {
  describe('#bind()', function() {
    it('should bind a function to a specific context', function() {
      function setter(value) {
        this.value = (value || 0) + (this.value || 0)
        return this
      }
      var context = {
        value: 10
      }
      var bounded = utils.bind(setter, context)
      assert(15 === bounded(5).value, 'should return 15')
      assert(15 === bounded().value, 'should return 15')
      assert(25 === bounded(10).value, 'should return 25')
    })
  })
})

describe('core#string', function() {
  var BaseController = core.BaseController
  describe('#startsWith', function() {
    it('String should have a method startsWith', function() {
      assert('function' === typeof String.prototype.startsWith, 'Missing startsWith function in String.prototype')
    })
  })
})

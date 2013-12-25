describe('core#event', function() {
  describe('#on()', function() {
    it('should add event listener on a specific node', function(done) {
      var wrapper = core.$('#wrapper')
      core.on(wrapper, 'click', 'h1', function onClick() {
        done()
      })
      phantom.click(document.getElementById('title'))
    })
    it('should manage event delegation', function(done) {
      var list = core.$('ol')
        , elements = core.$$('li', list)
        , count = 0
      core.on(list, 'click', 'li', function onClick() {
        ++count
        if (3 === count) {
          done()
        }
      })
      elements.forEach(phantom.click)
    })
  })
})

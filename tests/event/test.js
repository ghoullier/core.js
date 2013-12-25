describe('core#event', function() {
  describe('#on()', function() {
    it('should add event listener on a specific node', function(done) {
      var wrapper = core.$('#wrapper')
      core.on(wrapper, 'click', 'h1', function onClick() {
        done()
      })
      document.getElementById('title').click()
    })
    it('should manager event delegation', function(done) {
      var list = core.$('ol')
        , elements = core.$$(list, 'li')
        , count = 0
      core.on(list, 'click', 'li', function onClick() {
        ++count
        if (3 === elements.length) {
          done()
        }
      })
      elements.forEach(function(node) {
        node.click()
      })
    })
  })
})

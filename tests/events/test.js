describe('core#event', function() {
  var dom = require('../../core/dom')
    , events = require('../../core/events')
  describe('#on()', function() {
    it('should add event listener on a specific node', function(done) {
      var wrapper = dom.$('#wrapper')
      events.on(wrapper, 'click', 'h1', function onClick() {
        done()
      })
      phantom.click(document.getElementById('title'))
    })
    it('should manage event delegation', function(done) {
      var list = dom.$('ol')
        , elements = dom.$$('li', list)
        , count = 0
      events.on(list, 'click', 'li', function onClick() {
        ++count
        if (3 === count) {
          done()
        }
      })
      elements.forEach(phantom.click)
    })
  })
})

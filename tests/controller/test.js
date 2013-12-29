describe('core#controllers', function() {
  var dom = require('../../core/dom')
    , manager = require('../../core/manager')
    , Controller = require('../../core/controller')
  describe('#add', function() {
    it('should define a controller', function() {
      manager.add('Main', Controller.extend({
        initialize: function() {
          this.$list = this.$('ol')
        },
        add: function() {
          var element = document.createElement('li')
          element.textContent = Date.now()
          this.$list.appendChild(element)
        },
        size: function() {
          return this.$$('li', this.$list).length
        }
      }))
    })
    it('should bootstrap element by Dom attributes', function() {
      manager.bootstrap(document.documentElement)
    })
    it('should test controller methods', function(done) {
      var node = dom.$('section')
        , instance = manager.getInstanceByNode(node)
        , button = dom.$('button', node)
        , size = 3
      for (var i = 0; i < size; ++i) {
        phantom.click(button)
      }
      setTimeout(function() {
        if (size === instance.size()) {
          done()
        }
      }, 0)
    })
  })
})

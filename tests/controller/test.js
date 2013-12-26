describe('core#controllers', function() {
  var BaseController = core.BaseController
  describe('#add', function() {
    it('String should have a method startsWith', function() {
      'abc'.startsWith('a')
    })
    it('should define a controller', function() {
      core.controllers.add('Main', BaseController.extend({
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
      core.controllers.bootstrap(document.documentElement)
    })
    it('should test controller methods', function(done) {
      var node = core.$('section')
        , instance = core.controllers.getInstanceByNode(node)
        , button = core.$('button', node)
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

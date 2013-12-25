describe('core#controller', function() {
  var BaseController = core.BaseController
  describe('#extend', function() {
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
          return this.$list.length
        }
      }))
    })
/*
    it('should bootstrap element by Dom attributes', function() {
      //core.controllers.bootstrap(document.documentElement)
    })
    it('should test a controller', function(done) {
      var instance = core.controllers.instances[0]
        , button = core.$('button')
        , size = 3
      for (var i = 0; i < size; ++i) {
        button.click()
      }
      setTimeout(function() {
        if (size === instance.size()) {
          done()
        }
      }, 0)
    })
*/
  })
})

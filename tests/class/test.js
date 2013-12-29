describe('core#Class', function() {
  var Class = require('../../core/class')
  describe('#extend', function() {
    it('should define a class Human', function() {
      Human = Class.extend({
        talk: function() {
          return 'Be a Human is pretty cool'
        }
      })
      assert(Class.isPrototypeOf(Human), 'Class is the prototype of Human')
    })
  })
  describe('#create', function() {
    it('should create an instance of a Human', function() {
      var guy = Human.create()
      assert('Be a Human is pretty cool' === guy.talk(), 'Talk function should return the good value')
      assert(Human.isPrototypeOf(guy), 'guy should have for prototype Human')
    })
  })
  describe('#extend', function() {
    it('should define a class Developer', function() {
      Developer = Human.extend({
        constructor: function(language) {
          this.language = language || 'javascript'
        },
        talk: function() {
          return 'Be a Developer is pretty cool'
        }
      })
      assert(Class.isPrototypeOf(Developer), 'Class is the prototype of Developer')
      assert(Human.isPrototypeOf(Developer), 'Human is the prototype of Developer')
    })
  })
  describe('#create', function() {
    it('should create an instance of a Developer', function() {
      var rubyst = Developer.create('ruby')
      assert('Be a Developer is pretty cool' === rubyst.talk(), 'Talk function should return the good value')
      assert(Developer.isPrototypeOf(rubyst), 'rubyst should have for prototype Developer')
      assert('ruby' === rubyst.language, 'rubyst should use ruby language')
      var javascripter = Developer.create()
      assert('Be a Developer is pretty cool' === javascripter.talk(), 'Talk function should return the good value')
      assert(Developer.isPrototypeOf(javascripter), 'javascripter should have for prototype Developer')
      assert('javascript' === javascripter.language, 'javascripter should use javascript language')
    })
  })
})

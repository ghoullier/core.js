describe('core#form', function() {
  var dom = require('../../core/dom')
    , form = require('../../core/form')

  var formData = {
    firstname: 'gregory',
    lastname: 'houllier',
    username: 'ghoullier'
  }
  describe('#unserialize()', function() {
    it('should unserialize values to a form Node', function() {
      var node = dom.$('form')
        , firstname = dom.$('[name="firstname"]', node)
        , lastname = dom.$('[name="lastname"]', node)
        , username = dom.$('[name="username"]', node)
      // Call form api
      form.unserialize(node, formData)
      // Assertions
      assert(formData.firstname === firstname.value, 'Firstname should have the correct value')
      assert(formData.lastname === lastname.value, 'Lastname should have the correct value')
      assert(formData.username === username.value, 'Username should have the correct value')
    })
  })
  describe('#serialize()', function() {
    it('should serialize values from a form Node', function() {
      var node = dom.$('form')
        , data = form.serialize(node)
      // Assertions
      assert(formData.firstname === data.firstname, 'Firstname should have the correct value')
      assert(formData.lastname === data.lastname, 'Lastname should have the correct value')
      assert(formData.username === data.username, 'Username should have the correct value')
    })
  })
})

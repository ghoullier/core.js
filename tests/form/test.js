describe('core#form', function() {
  var formData = {
    firstname: 'gregory',
    lastname: 'houllier',
    username: 'ghoullier'
  }
  describe('#unserialize()', function() {
    it('should unserialize values to a form Node', function() {
      var form = core.$('form')
        , firstname = core.$('[name="firstname"]', form)
        , lastname = core.$('[name="lastname"]', form)
        , username = core.$('[name="username"]', form)
      // Call form api
      core.form.unserialize(form, formData)
      // Assertions
      assert(formData.firstname === firstname.value, 'Firstname should have the correct value')
      assert(formData.lastname === lastname.value, 'Lastname should have the correct value')
      assert(formData.username === username.value, 'Username should have the correct value')
    })
  })
  describe('#serialize()', function() {
    it('should serialize values from a form Node', function() {
      var form = core.$('form')
        , data = core.form.serialize(form)
      // Assertions
      assert(formData.firstname === data.firstname, 'Firstname should have the correct value')
      assert(formData.lastname === data.lastname, 'Lastname should have the correct value')
      assert(formData.username === data.username, 'Username should have the correct value')
    })
  })
})

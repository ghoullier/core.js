describe('core#template', function() {
  describe('#compile', function() {
    it('Compile a template with array arguments', function() {
      var template = '{{0}} to {{1}}'
        , args = ['Hello', 'you']
      assert('Hello to you' === core.template.compile(template, args), 'Incorrect compile return')
    })
    it('Compile a template with object arguments', function() {
      var template = '{{hello}} {{name.first}} {{name.last}}'
        , args = {
          hello: 'Hello',
          name: {
            first: 'Grégory',
            last: 'Houllier'
          }
        }
      assert('Hello Grégory Houllier' === core.template.compile(template, args), 'Incorrect compile return')
    })
  })
})

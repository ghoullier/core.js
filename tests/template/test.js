describe('core#template', function() {
  describe('#getTemplateById', function() {
    it('Retrieve HTML template stored in current Dom', function() {
      var template = core.template.getTemplateById('template:test:parse')
      assert(template !== null, 'Template is not null')
      assert(template.startsWith('<section>'))
    })
  })
  describe('#parse', function() {
    it('Parse HTML template in Dom', function() {
      var template = core.template.getTemplateById('template:test:parse')
        , fragment = core.template.parse(template)
      assert(1 === core.$$('section > h1', fragment).length, 'Fragment should have a section and a h1 tite')
      assert('Test' === core.$('section > h1', fragment).textContent, 'H1 element have a text value "Test"')
    })
  })
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
  describe('#build', function() {
    it('Build Dom from HTML template', function() {
      var fragment = core.template.build({
          id: 'template:test:build',
          data: {
            text: 'Test'
          }
        })
      assert(1 === core.$$('section > h1', fragment).length, 'Fragment should have a section and a h1 tite')
      assert('Test' === core.$('section > h1', fragment).textContent, 'H1 element have a text value "Test"')
    })
  })
})

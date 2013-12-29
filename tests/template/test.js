describe('core#template', function() {
  var dom = require('../../core/dom')
    , template = require('../../core/template')
  describe('#getTemplateById', function() {
    it('Retrieve HTML template stored in current Dom', function() {
      var tpl = template.getTemplateById('template:test:parse')
      assert(tpl !== null, 'Template is not null')
      assert(tpl.startsWith('<section>'))
    })
  })
  describe('#parse', function() {
    it('Parse HTML template in Dom', function() {
      var tpl = template.getTemplateById('template:test:parse')
        , fragment = template.parse(tpl)
      assert(1 === dom.$$('section > h1', fragment).length, 'Fragment should have a section and a h1 tite')
      assert('Test' === dom.$('section > h1', fragment).textContent, 'H1 element have a text value "Test"')
    })
  })
  describe('#compile', function() {
    it('Compile a template with array arguments', function() {
      var tpl = '{{0}} to {{1}}'
        , args = ['Hello', 'you']
      assert('Hello to you' === template.compile(tpl, args), 'Incorrect compile return')
    })
    it('Compile a template with object arguments', function() {
      var tpl = '{{hello}} {{name.first}} {{name.last}}'
        , args = {
          hello: 'Hello',
          name: {
            first: 'Grégory',
            last: 'Houllier'
          }
        }
      assert('Hello Grégory Houllier' === template.compile(tpl, args), 'Incorrect compile return')
    })
  })
  describe('#build', function() {
    it('Build Dom from HTML template', function() {
      var fragment = template.build({
          id: 'template:test:build',
          data: {
            text: 'Test'
          }
        })
      assert(1 === dom.$$('section > h1', fragment).length, 'Fragment should have a section and a h1 tite')
      assert('Test' === dom.$('section > h1', fragment).textContent, 'H1 element have a text value "Test"')
    })
  })
})

describe('core#dom', function() {
  describe('#$()', function() {
    it('should get a DomNode for a specific CSS selector', function() {
      var wrapper = core.$('#wrapper')
        , none = core.$('#none')
        , title = core.$('h1', wrapper)
      assert(document.getElementById('wrapper') === wrapper, 'Should return the good DomNode')
      assert(null === none, 'Should return null for a non exiting element')
      assert('Titre' === title.textContent, 'Should return the good text for title element')
    })
  })
  describe('#$$()', function() {
    it('should get a DomNodeList for a specific CSS selector', function() {
      var list = core.$('ol')
        , elements = core.$$('li', list)
        , links = core.$$('a', list)
      assert(3 === elements.length, 'Should return 3 elements')
      assert(0 === links.length, 'Should return 0 links')
    })
  })
})

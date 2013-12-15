;(function(root, doc, core) {
  var BaseController = core.BaseController
    , storage = core.storage.locale
  core.controllers.add('Main', BaseController.extend({
    initialize: function() {
      this.$input = this.$('input')
      this.$list = this.$('ol')
    },
    add: function() {
      var value = this.$input.value
        , child = doc.createElement('li')
      child.textContent = value
      this.$list.appendChild(child)
    },
    clear: function() {
      var $list = this.$list
      while ($list.firstChild) {
        $list.removeChild($list.firstChild)
      }
    }
  })).add('Register', BaseController.extend({
    initialize: function() {
      this.$form = this.$('form')
      this.on('submit', 'form', this.submit)
      this.load()
    },
    load: function() {
      if (storage.has('Register:form')) {
        core.form.unserialize(this.$form, storage.get('Register:form'))
      }
    },
    submit: function(event) {
      event.preventDefault()
      storage.set('Register:form', core.form.serialize(this.$form))
    }
  }))
}(this, this.document, this.core))

;(function(root, doc, core) {
  var BaseController = core.BaseController
    , storage = core.storage.locale
  core.controllers.add('Main', BaseController.extend({
    todos: [],
    initialize: function() {
      this.$input = this.$('input')
      this.$list = this.$('ol')
      this.$form = this.$('form')
      this.on('submit', 'form', this.bind(this.submit))
      this.load()
    },
    add: function(todo) {
      var child = doc.createElement('li')
      todo = ('undefined' === typeof todo) ? {value: this.$input.value} : todo
      child.textContent = todo.value
      this.$list.appendChild(child)
    },
    clear: function() {
      var $list = this.$list
      while ($list.firstChild) {
        $list.removeChild($list.firstChild)
      }
      storage.set('Main:list', [])
    },
    load: function() {
      if (storage.has('Main:form')) {
        core.form.unserialize(this.$form, storage.get('Main:form'))
      }
      this.todos = storage.has('Main:list') ? storage.get('Main:list') : []
      this.todos.forEach(function(todo) {
        this.add(todo)
      }, this)
    },
    submit: function(event) {
      event.preventDefault()
      var todo = core.form.serialize(this.$form)
      this.add(todo)
      this.todos.push(todo)
      storage.set('Main:list', this.todos)
      this.reset()
    },
    reset: function() {
      core.form.unserialize(this.$form, {
        value: '',
        status: 'off'
      })
    }
  }))
}(this, this.document, this.core))

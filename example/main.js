;(function(root, doc, core) {
  var storage = core.storage.locale
  core.controllers.add('Main', core.BaseController.extend({
    todos: [],
    initialize: function() {
      this.$text = this.$('input[type="text"]')
      this.$completed = this.$('input[type="checkbox"]')
      this.$list = this.$('ol')
      this.$form = this.$('form')
      this.load()
    },
    add: function(todo) {
      var child = doc.createElement('li')
      todo = ('undefined' === typeof todo) ? {value: this.$text.value, completed: this.$completed.checked} : todo
      child.textContent = todo.value
      child.classList.add(todo.completed ? 'completed' : 'active')
      this.$list.appendChild(child)
    },
    clear: function() {
      this.empty(this.$list)
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
        completed: false
      })
    }
  }))
}(this, this.document, this.core))

//browserify examples/base/index.js -o examples/base/index.min.js -s examples/base/index.min.js

var manager    = require('../../core/mvc/manager')
var Controller = require('../../core/mvc/controller')
var form       = require('../../core/form')
var storage    = require('../../core/storage').locale

manager.add('Main', Controller.extend({
  todos: [],
  initialize: function() {
    this.$text = this.$('input[type="text"]')
    this.$completed = this.$('input[type="checkbox"]')
    this.$list = this.$('ol')
    this.$form = this.$('form')
    this.load()
  },
  add: function(todo) {
    var child = document.createElement('li')
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
      form.unserialize(this.$form, storage.get('Main:form'))
    }
    this.todos = storage.has('Main:list') ? storage.get('Main:list') : []
    this.todos.forEach(function(todo) {
      this.add(todo)
    }, this)
  },
  submit: function(event) {
    event.preventDefault()
    var todo = form.serialize(this.$form)
    this.add(todo)
    this.todos.push(todo)
    storage.set('Main:list', this.todos)
    this.reset()
  },
  reset: function() {
    form.unserialize(this.$form, {
      value: '',
      completed: false
    })
  }
}))

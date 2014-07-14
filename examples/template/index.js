//browserify examples/template/index.js -o examples/template/index.min.js -s examples/template/index.min.js

var manager    = require('../../core/mvc/manager')
var Controller = require('../../core/mvc/controller')
var form       = require('../../core/form')
var template   = require('../../core/template')
var trace      = require('../../core/trace')

manager.add('Template', Controller.extend({
  initialize: function() {
    this.$form = this.$('form')
    this.$list = this.$('ol')
  },
  add: function(event) {
    event.preventDefault()
    this.$list.appendChild(template.build(this.getTemplateArgs()))
    this.reset()
  },
  getTemplateData: function() {
    return form.serialize(this.$form)
  },
  remove: function remove() {
    trace(arguments)
  },
  reset: function() {
    form.unserialize(this.$form, {
      content: ''
    })
  }
}))

var manager = require('../../core/manager')
  , form = require('../../core/form')
  , template = require('../../core/template')
  , Controller = require('../../core/controller')

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
  reset: function() {
    form.unserialize(this.$form, {
      content: ''
    })
  }
}))

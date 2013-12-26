;(function(root, doc, core) {
  core.controllers.add('Template', core.BaseController.extend({
    initialize: function() {
      this.$form = this.$('form')
      this.$list = this.$('ol')
    },
    add: function(event) {
      event.preventDefault()
      this.$list.appendChild(core.template.build({
        id: this.element.dataset.templateId,
        data: core.form.serialize(this.$form)
      }))
      core.form.unserialize(this.$form, {
        content: ''
      })
    }
  }))
}(this, this.document, this.core))

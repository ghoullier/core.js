;(function(root, doc, core) {
  core.controllers.add('Main', core.BaseController.extend({
    action: function() {
      console.log('action')
    }
  }))
}(this, this.document, this.core))

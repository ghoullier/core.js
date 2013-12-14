;(function(root, doc, core) {
  core.controllers.add('Main', core.BaseController.extend({
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
  }))
}(this, this.document, this.core))

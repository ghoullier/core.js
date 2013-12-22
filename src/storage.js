(function(root, doc, module) {
  'use strict';
  var logger = console
    , Class = core.Class
    , Store = Class.extend({
      constructor: function(storage) {
        this.storage = storage
      },
      set: function(key, value) {
        this.storage.setItem(key, JSON.stringify({
          value: value
        }))
      },
      get: function(key) {
        return JSON.parse(this.storage.getItem(key)).value
      },
      remove: function(key) {
        this.storage.removeItem(key)
      },
      has: function(key) {
        return null !== this.storage.getItem(key)
      }
    })
  var storage = Object.create(null)
  storage.locale = Store.create(root.localStorage)
  storage.session = Store.create(root.sessionStorage)
  module.storage = storage
}(this, this.document, this.core))

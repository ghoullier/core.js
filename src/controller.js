(function(root, doc, module) {
  'use strict';
  var Class = core.Class
    , BaseController = Class.extend({
        constructor: function(element) {
          this.element = element
          this.on('click', '[data-method]', function(event) {
            console.log('lou', this, event)
            // Dynamic invocation
          })
        },
        $: function(selector) {
          return core.$(this.element, selector);
        },
        $$: function(selector) {
          return core.$$(this.element, selector);
        },
        on: function(type, selector, handler) {
          core.on(this.element, type, selector, handler)
        }
      })
    , List = Class.extend({
        constructor: function() {
          this.map = {}
          this.instances = []
        },
        add: function(name, factory) {
          this.map[name] = factory
        },
        get: function(name) {
          return this.map[name]
        },
        has: function(name) {
          return BaseController.isPrototypeOf(this.get(name))
        },
        bootstrap: function(node) {
          var self = this
          core.$$(node, '[data-controller]').forEach(function(context) {
            var name = context.dataset.controller
            if (self.has(name)) {
              self.instances.push(self.get(name).create(context))
            } else {
              // Undefined controller
            }
          })
        }
      })
    module.controllers = List.create()
    module.BaseController = BaseController
}(this, this.document, this.core))

(function(root, doc, module) {
  'use strict';
  var logger = console
    , Class = core.Class
    , BaseController = Class.extend({
        constructor: function(element) {
          var instance = this
          instance.element = element
          instance.on('click', '[data-method]', function(event) {
            var method = this.dataset.method
              , handler = instance[method]
            if ('function' === typeof handler) {
              handler.call(instance, event)
            } else {
              logger.error('Undefined method', method)
            }
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
          var self = this
          self.map = {}
          self.instances = []
          doc.addEventListener('DOMContentLoaded', function() {
            self.bootstrap(doc.docElement)
          }, false)
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
              logger.error('Undefined controller', name)
            }
          })
        }
      })
    module.controllers = List.create()
    module.BaseController = BaseController
}(this, this.document, this.core))

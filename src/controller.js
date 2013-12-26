(function(root, doc, module) {
  'use strict';
  var logger = console
    , Class = core.Class
    , BaseController = Class.extend({
        constructor: function(element) {
          // Set element property
          this.element = element
          // Event delegation
          this.delegate()
          // Call abstract method
          this.initialize()
        },
        delegate: function() {
          var instance = this
            , prefix = 'on'
            , namespace = ['data', prefix].join('-')
          // List event types
          var types = []
          instance.$$('[' + namespace + ']').forEach(function(node) {
            types = types.concat(Object.keys(node.dataset)
              .filter(function(handler) {
                return handler.startsWith(prefix) && handler.length > prefix.length
              })
              .map(function(handler) {
                return handler.substring(prefix.length).toLowerCase()
              }))
          })
          types
            // Filter duplicates entries
            .filter(function(item, index, self) {
              return self.indexOf(item) === index;
            })
            // Add event delegation
            .forEach(function(type) {
              var selector = '[' + [namespace, type].join('-') + ']'
              instance.on(type, selector, function(event) {
                var property = prefix + core.string.firstUpperCase(type)
                  , method = this.dataset[property]
                  , handler = instance[method]
                if ('function' === typeof handler) {
                  handler.call(instance, event)
                } else {
                  logger.error('Undefined method', this, method, property)
                }
              })
            })
        },
        initialize: function() {
          // Abstract
        },
        $: function(selector, context) {
          return core.$(selector, context || this.element);
        },
        $$: function(selector, context) {
          return core.$$(selector, context || this.element);
        },
        empty: function(node) {
          while (node.firstChild) {
            node.removeChild(node.firstChild)
          }
        },
        on: function(type, selector, handler) {
          core.on(this.element, type, selector, handler)
        },
        bind: function(fn) {
          return core.bind(fn, this)
        }
      })
    , List = Class.extend({
        constructor: function() {
          var self = this
          self.definitions = {}
          self.instances = []
          doc.addEventListener('DOMContentLoaded', function() {
            self.bootstrap(doc.documentElement)
          }, false)
        },
        add: function(name, factory) {
          this.definitions[name] = factory
          return this
        },
        get: function(name) {
          return this.definitions[name]
        },
        has: function(name) {
          return BaseController.isPrototypeOf(this.get(name))
        },
        getInstanceByNode: function(node) {
          var instances = this.instances.filter(function(value) {
            return value.node === node
          })
          return instances.length > 0 ? instances[0].controller : null
        },
        bootstrap: function(context) {
          var self = this
          core.$$('[data-controller]', context).forEach(function(node) {
            var dataset = node.dataset
            if (null === self.getInstanceByNode(node)) {
              var name = dataset.controller
              if (self.has(name)) {
                self.instances.push({
                  node: node,
                  controller: self.get(name).create(node)
                })
              } else if (typeof dataset.lazyload !== 'undefined') {
                logger.log('Wait for controller definition', name)
              } else {
                logger.error('Undefined controller', name)
              }
            } else {
              // Controller already instantiated
            }
          })
        }
      })
    module.controllers = List.create()
    module.BaseController = BaseController
}(this, this.document, this.core))

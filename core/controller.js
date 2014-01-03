var dom = require('./dom')
  , events = require('./events')
  , string = require('./string')
  , template = require('./template')
  , utils = require('./utils')
  , Class = require('./class')

var Controller = Class.extend({
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
            return self.indexOf(item) === index
          })
          // Add event delegation
          .forEach(function(type) {
            var selector = '[' + [namespace, type].join('-') + ']'
            instance.on(type, selector, function(event) {
              var property = prefix + string.firstUpperCase(type)
                , method = this.dataset[property]
                , handler = instance[method]
              if ('function' === typeof handler) {
                handler.call(instance, event)
              } else {
                var message = 'Undefined function "{{method}}" for the handler "{{property}}"'
                console.error(template.compile(message, {
                  method: method,
                  property: property
                }))
              }
            })
          })
      },
      initialize: function() {
        // Abstract
      },
      getTemplateArgs: function() {
        var dataset = this.element.dataset
        return {
          id: dataset.templateId,
          uri: dataset.templateUri,
          data: this.getTemplateData()
        }
      },
      getTemplateData: function() {
        // Abstract
      },
      $: function(selector, context) {
        return dom.$(selector, context || this.element)
      },
      $$: function(selector, context) {
        return dom.$$(selector, context || this.element)
      },
      empty: function(node) {
        while (node.firstChild) {
          node.removeChild(node.firstChild)
        }
      },
      on: function(type, selector, handler) {
        events.on(this.element, type, selector, handler)
      },
      bind: function(fn) {
        return utils.bind(fn, this)
      }
    })
module.exports = Controller

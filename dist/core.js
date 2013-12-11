(function(root, doc, module) {
  'use strict';
  root.core = module
}(this, this.document, this.core = {}))
;(function(root, doc, module) {
  'use strict';
  var slice = Array.prototype.slice
  function $(selector) {
    return doc.querySelector(selector)
  }
  function $$(selector) {
    return slice.call(doc.querySelectorAll(selector))
  }
  module.$ = $
  module.$$ = $$
}(this, this.document, this.core))
;(function(root, doc, module) {
  'use strict';
  var docEl = doc.documentElement
    , matchesSelector =
        docEl.matchesSelector ||
        docEl.webkitMatchesSelector ||
        docEl.mozMatchesSelector ||
        docEl.oMatchesSelector ||
        docEl.msMatchesSelector

  /**
   * Get current target for a specific event
   * @param  {Node} node        Parent root node
   * @param  {Node} target      Element to test
   * @param  {String} selector  Selector value
   * @return {Node|Boolean}     False or Target
   */
  function getCurrentTarget(node, target, selector) {
    if (matchesSelector.call(target, selector)) return target
    while (target = target.parentNode && node !== target) {
      if (target.nodeType != 1) return false
      if (matchesSelector.call(target, selector)) return target
    }
    return false
  }
  /**
   * Event delegation
   * @param  {Node} node          Event delegation node
   * @param  {String} type        Event type
   * @param  {String} selector    CSS Selector
   * @param  {Function} handler   Event handler
   * @return {void}
   */
  function on(node, type, selector, handler) {
    node.addEventListener(type, function listener(event) {
      var target = getCurrentTarget(node, event.target, selector)
      if (target) {
        handler.call(target, event)
      }
    }, false)
  }
  module.on = on
}(this, this.document, this.core))
;(function(root, doc, module) {
  'use strict';
  function extend(object) {
    var self = Object.create(this)
    if (!object) return self
    Object.keys(object).forEach(function(key) {
      self[key] = object[key]
    })
    return self
  }
  function create() {
    var self = Object.create(this)
    if (typeof self.constructor === 'function') {
      self.constructor.apply(self, arguments)
    }
    return self
  }
  module.extend = extend
  module.create = create
}(this, this.document, this.core))

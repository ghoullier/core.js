(function(root, doc, module) {
  'use strict';
  var slice = Array.prototype.slice
  /**
   * Alias on querySelector for an optional context
   * @param  {string} selector  CSS3 selector
   * @param  {DOMNode} context  Node context
   * @return {null|DOMNOde}     Selected DOMNode
   * @api public
   */
  function $(selector, context) {
    context = context || doc.documentElement
    return context.querySelector(selector)
  }
  /**
   * Alias on querySelectorAll for an optional context
   * @param  {String} selector  CSS3 selector
   * @param  {DOMNOde} context  Node context
   * @return {Array}            Selected Node list
   * @api public
   */
  function $$(selector, context) {
    context = context || doc.documentElement
    return slice.call(context.querySelectorAll(selector))
  }
  module.$ = $
  module.$$ = $$
}(this, this.document, this.core))

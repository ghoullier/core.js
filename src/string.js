(function(root, doc, module) {
  'use strict';
  var string = Object.create(null)
  /**
   * Set the first upper case for a given word
   * @param  {String} word Word to convert
   * @return {String}      Converted word
   * @api public
   */
  function firstUpperCase(word) {
    return word.charAt(0).toUpperCase() + word.substring(1)
  }
  string.firstUpperCase = firstUpperCase
  module.string = string
}(this, this.document, this.core))

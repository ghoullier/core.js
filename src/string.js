(function(root, doc, module) {
  'use strict';
  /**
   * Set the first upper case for a given word
   * @param  {String} word Word to convert
   * @return {String}      Converted word
   * @api public
   */
  function firstUpperCase(word) {
    return word ? word.charAt(0).toUpperCase() + word.substring(1) : word;
  }
  // Define submodule
  var string = Object.create(null)
  string.firstUpperCase = firstUpperCase
  // Export submodule
  module.string = string
}(this, this.document, this.core))

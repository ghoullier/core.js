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
  // Precompile variables
  var patternRegExp = /\{\{([\w\*\.]*?)\}\}/g
    , dotRegExp = /([^\.]+)/g
  /**
   * Precompile template
   * @param  {String} template String to precompile
   * @param  {Object} object   Template arguments
   * @return {String}          Precompiled template
   * @api public
   */
  function precompile(template, object) {
    var args = arguments.length > 2 ? arguments : object
    return template.replace(patternRegExp, function(value, property) {
      var key
        , map = args
      while ((key = dotRegExp.exec(property)) && (key = key[1])) {
        map = map ? (key == '*' ? map : map[key]) : null
      }
      return map == void 0 ? '' : map
    })
  }
  // Define submodule
  var string = Object.create(null)
  string.firstUpperCase = firstUpperCase
  string.precompile = precompile
  // Export submodule
  module.string = string
}(this, this.document, this.core))

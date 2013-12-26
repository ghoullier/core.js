(function(root, doc, module) {
  'use strict';
  // Module variables
  var patternRegExp = /\{\{([\w\*\.]*?)\}\}/g
    , dotRegExp = /([^\.]+)/g
    , parser = doc.createElement('div')
  /**
   * Build Node fragment
   * @param  {Object} params Build parameters
   * @return {NodeFragment}  Builded Node fragment
   * @api public
   */
  function build(params) {
    var template
    if (params.id) {
      template = getTemplateById(params.id)
    } else if (params.uri) {
      template = getTemplateById(params.uri)
    }
    return parse(compile(template, params.data))
  }
  /**
   * Compile template
   * @param  {String} template String to precompile
   * @param  {Object} object   Template arguments
   * @return {String}          Precompiled template
   * @api public
   */
  function compile(template, object) {
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
  /**
   * Parse HTML string
   * @param  {String} html HTML string
   * @return {DOMFragment} Parsed DOMFragment
   * @api public
   */
  function parse(html) {
    var fragment = doc.createDocumentFragment()
    parser.innerHTML = html
    while (parser.firstChild) {
      fragment.appendChild(parser.firstChild)
    }
    return fragment
  }
  /**
   * Get template by id
   * @param  {String} id Template id
   * @return {String}    Template string
   * @api public
   */
  function getTemplateById(id) {
    var template = doc.getElementById(id)
    return template ? template.innerHTML.trim() : null
  }
  /**
   * Get template by uri
   * @param  {String} uri Template uri
   * @return {String}     Template string
   * @api public
   */
  function getTemplateByUri(uri) {
    throw new Error('Not implemented function')
  }
  // Define submodule
  var template = Object.create(null)
  template.build = build
  template.compile = compile
  template.parse = parse
  template.getTemplateById = getTemplateById
  template.getTemplateByUri = getTemplateByUri
  // Export submodule
  module.template = template
}(this, this.document, this.core))

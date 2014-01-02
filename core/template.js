define(function(require, exports, module) {
  // Module variables
  var patternRegExp = /\{\{([\w\*\.]*?)\}\}/g
    , dotRegExp = /([^\.]+)/g
    , parser = document.createElement('div')
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
      template = getTemplateByUri(params.uri)
    }
    return parse(compile(template, params.data))
  }
  module.exports.build = build

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
  module.exports.compile = compile

  /**
   * Parse HTML string
   * @param  {String} html HTML string
   * @return {DOMFragment} Parsed DOMFragment
   * @api public
   */
  function parse(html) {
    var fragment = document.createDocumentFragment()
    parser.innerHTML = html
    while (parser.firstChild) {
      fragment.appendChild(parser.firstChild)
    }
    return fragment
  }
  module.exports.parse = parse

  /**
   * Get template by id
   * @param  {String} id Template id
   * @return {String}    Template string
   * @api public
   */
  function getTemplateById(id) {
    var template = document.getElementById(id)
    return template ? template.innerHTML.trim() : null
  }
  module.exports.getTemplateById = getTemplateById

  /**
   * Get template by uri
   * @param  {String} uri Template uri
   * @return {String}     Template string
   * @api public
   */
  function getTemplateByUri(uri) {
    var loader = new XMLHttpRequest()
    loader.open('GET', uri, false)
    loader.send(null)
    return 200 === loader.status ? loader.responseText.trim() : null
  }
  module.exports.getTemplateByUri = getTemplateByUri
})

/**
 * Set the first upper case for a given word
 * @param  {String} word Word to convert
 * @return {String}      Converted word
 * @api public
 */
function firstUpperCase(word) {
  return word ? word.charAt(0).toUpperCase() + word.substring(1) : word
}
exports.firstUpperCase = firstUpperCase

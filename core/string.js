/**
 * Set the first upper case for a given word
 * @param  {String} word Word to convert
 * @return {String}      Converted word
 * @api public
 */
function toPascalCase(word) {
  return word ? word.charAt(0).toUpperCase() + word.substring(1) : word
}
module.exports.toPascalCase = toPascalCase

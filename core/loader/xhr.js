/**
 * HTTP Request
 * @param  {String} url
 * @param  {String} verb
 * @param  {Object} data
 * @return {Promise}
 */
function load(url, verb, data) {
  /**
   * Async task to load image
   * @param  {Function} resolve
   * @param  {Function} reject
   * @return {void}
   */
  function async(resolve, reject) {
    var request = new XMLHttpRequest()
    request.open(verb, url)
    request.addEventListener('load', onLoad)
    request.addEventListener('error', onError)
    function onLoad() {
      if (200 === request.status) {
        resolve(request.response)
      } else {
        reject(request.statusText)
      }
    }
    function onError(error) {
      reject(error)
    }
    request.send()
  }
  return new Promise(async)
}
module.exports = load

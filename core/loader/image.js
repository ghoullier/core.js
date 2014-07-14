/**
 * Load image async using promise
 * @param  {String} url
 * @return {Promise}
 */
function load(url) {
  /**
   * Async task to load image
   * @param  {Function} resolve
   * @param  {Function} reject
   * @return {void}
   */
  function async(resolve, reject) {
    var image = new Image()
    image.src = url
    image.addEventListener('load', onLoad);
    image.addEventListener('error', onError);
    function onLoad(event) {
      resolve(image, event)
    }
    function onError(error) {
      reject(error)
    }
  }
  return new Promise(async)
}
exports.load = load

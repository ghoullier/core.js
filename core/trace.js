/**
 * Trace function execution
 * @param  {Arguments} args
 * @return {void}
 */
function trace(args) {
  console.log(args.callee.name, args)
}
module.exports = trace

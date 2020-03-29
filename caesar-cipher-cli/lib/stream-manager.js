const util = require('util');
const pipeline = util.promisify(require('stream').pipeline);
const fs = require('fs');
const exit = process.exit;
const { buildCipherTransformStream } = require('./stream-transform-builder');

module.exports = {
  /**
   * @param {Integer} shift
   * @param {String} action
   * @param {String|undefined} input
   * @param {String|undefined} output
   * @return {Promise<unknown>}
   */
  managePipeline: async (shift, action, input, output) =>
    await pipeline(
      getInputStream(input),
      buildCipherTransformStream(action, shift),
      getOutputStream(output)
    )
};

/**
 * @param {String|undefined} input
 * @return {ReadStream}
 */
function getInputStream(input) {
  if (typeof input === 'undefined') {
    process.stdin.setEncoding('utf-8');
    return process.stdin;
  }
  return fs.createReadStream(input, { encoding: 'utf-8' });
}

/**
 * @param output
 * @return {WriteStream}
 */
function getOutputStream(output) {
  if (typeof output === 'undefined') {
    return process.stdout;
  }

  // eslint-disable-next-line no-sync
  if (fs.existsSync(output) === false) {
    process.stderr.write('File does not exist');
    exit(1);
  }

  return fs.createWriteStream(output, { flags: 'a' }).on('access', data => {
    console.log(data);
  });
}

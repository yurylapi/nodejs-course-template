const stream = require('stream');
const { encrypt, decrypt } = require('./caesar-cipher');
const exit = process.exit;

module.exports = {
  /**
   * @param {String} action
   * @param {Integer} shift
   * @return {module:stream.internal.Transform}
   */
  buildCipherTransformStream: (action, shift) => {
    return new stream.Transform({
      readableObjectMode: true,
      writableObjectMode: true,
      transform: (chunk, encoding, callback) => {
        let data;
        switch (action) {
          case 'encode':
            data = encrypt(shift, chunk);
            break;
          case 'decode':
            data = decrypt(shift, chunk);
            break;
          default:
            process.stderr.write('No such action');
            exit(1);
        }
        callback(null, data);
      }
    });
  }
};

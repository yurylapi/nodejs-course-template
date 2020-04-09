const { validationResult } = require('express-validator');
const { ErrorHandler } = require('./error-handler');
const { BAD_REQUEST, getStatusText } = require('http-status-codes');

module.exports = {
  validate: async req => {
    const errors = validationResult(req);
    const status = BAD_REQUEST;
    if (!errors.isEmpty()) {
      throw new ErrorHandler(status, getStatusText(status), errors.array());
    }
  }
};

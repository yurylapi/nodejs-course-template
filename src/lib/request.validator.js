const { validationResult } = require('express-validator');
const { ErrorHandler } = require('./error-handler');
const { BAD_REQUEST, getStatusText } = require('http-status-codes');

module.exports = {
  validate: async req => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const status = BAD_REQUEST;
      throw new ErrorHandler(status, getStatusText(status), errors.array());
    }
  }
};

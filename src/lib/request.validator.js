const { validationResult } = require('express-validator');
const { ErrorHandler } = require('./error-handler');

module.exports = {
  validate: async (req, message) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorHandler(400, message, errors.array());
    }
  }
};

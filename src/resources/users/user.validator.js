const { body, param, validationResult } = require('express-validator');
const { ErrorHandler } = require('../../lib/error-handler');

module.exports = {
  userIdValidation: [
    param('id')
      .not()
      .isEmpty()
      .isUUID()
      .trim()
      .escape()
  ],
  userRequestValidation: [
    body(['name', 'login'])
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body('password')
      .isLength({ min: 5 })
      .trim()
      .escape()
  ],
  validate: async (req, message) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorHandler(422, message, errors.array());
    }
  }
};

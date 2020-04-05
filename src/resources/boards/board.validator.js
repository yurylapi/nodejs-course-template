const { check, body, param, validationResult } = require('express-validator');
const { ErrorHandler } = require('../../lib/error-handler');

module.exports = {
  boardIdValidation: [
    param('id')
      .not()
      .isEmpty()
      .isUUID()
      .trim()
      .escape()
  ],
  boardValidation: [
    body('title')
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body('columns').isArray({ min: 1 })
  ],
  columnValidation: [
    check('columns.*.title')
      .not()
      .isEmpty()
      .trim()
      .escape(),
    check('columns.*.order')
      .optional()
      .isInt()
  ],
  validate: async (req, message) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorHandler(400, message, errors.array());
    }
  }
};

const { body, param, validationResult } = require('express-validator');
const { ErrorHandler } = require('../../lib/error-handler');

module.exports = {
  taskIdValidation: [
    param('id')
      .not()
      .isEmpty()
      .isUUID()
      .trim()
      .escape()
  ],
  boardIdValidation: [
    param('boardId')
      .not()
      .isEmpty()
      .isUUID()
      .trim()
      .escape()
  ],
  taskValidation: [
    body('title')
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body('order')
      .optional()
      .isInt(),
    body('title')
      .optional()
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body(['userId', 'columnId'])
      .not()
      .isEmpty()
      .isUUID()
      .trim()
      .escape()
  ],
  validate: async (req, message) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorHandler(400, message, errors.array());
    }
  }
};

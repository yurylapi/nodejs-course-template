const { body, param } = require('express-validator');

module.exports = {
  taskIdValidation: [
    param('id')
      .not()
      .isEmpty()
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
      .optional()
      .trim()
      .escape()
  ]
};

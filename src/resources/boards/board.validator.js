const { check, body, param } = require('express-validator');

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
  ]
};

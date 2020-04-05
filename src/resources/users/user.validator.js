const { body, param } = require('express-validator');

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
  ]
};

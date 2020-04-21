const { check } = require('express-validator');

module.exports = {
  loginValidation: [
    check('login', 'Does not exist').exists(),
    check('password', 'Does not exist').exists(),
    check('password', 'Min 5 length').isLength({ min: 5 })
  ]
};

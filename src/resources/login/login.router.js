const router = require('express').Router();
const loginController = require('./login.controller');
const { loginValidation } = require('./login.validator');

router.get('/', loginValidation, loginController.authenticateAction);

module.exports = router;

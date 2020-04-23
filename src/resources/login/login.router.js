const router = require('express').Router();
const loginController = require('./login.controller');
const { loginValidation } = require('./login.validator');

router.post('/', loginValidation, loginController.authenticateAction);

module.exports = router;

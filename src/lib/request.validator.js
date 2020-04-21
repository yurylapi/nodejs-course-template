const { validationResult } = require('express-validator');
const { ErrorHandler } = require('./error-handler');
const {
  BAD_REQUEST,
  UNAUTHORIZED,
  getStatusText
} = require('http-status-codes');
const JWT_SECRET_KEY = require('../common/config').JWT_SECRET_KEY;
const jwt = require('jsonwebtoken');

module.exports = {
  validate: async req => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const status = BAD_REQUEST;
      throw new ErrorHandler(status, getStatusText(status), errors.array());
    }
  },
  validateToken: (req, res, next) => {
    const token = req.header('Authorization');
    try {
      req.user = jwt.verify(token.slice(7), JWT_SECRET_KEY);
    } catch (error) {
      throw new ErrorHandler(UNAUTHORIZED, getStatusText(UNAUTHORIZED));
    }
    next();
  }
};

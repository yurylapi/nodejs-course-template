class ErrorHandler extends Error {
  constructor(statusCode, message, data) {
    super();
    this.message = message;
    this.statusCode = statusCode || 500;
    this.data = data;
  }
}

const catchErrors = fn => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (err) {
    return next(err);
  }
};

const handleError = (req, res) => {
  const { statusCode = 500, message, data } = req;
  res.status(statusCode).json({
    statusCode,
    message,
    errors: data
  });
};

module.exports = {
  ErrorHandler,
  handleError,
  catchErrors
};

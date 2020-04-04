class ErrorHandler extends Error {
  constructor(statusCode, message, data) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}

const handleError = (err, res) => {
  const { statusCode, message, data } = err;
  res.status(statusCode).json({
    statusCode,
    message,
    errors: data
  });
};

module.exports = {
  ErrorHandler,
  handleError
};

const reqLoggerMiddleware = (req, res, next) => {
  const { url: reqUrl, params: reqParams, body: reqBody } = req;
  console.log({ url: reqUrl, params: reqParams, body: reqBody });
  next();
};

module.exports = { reqLoggerMiddleware };

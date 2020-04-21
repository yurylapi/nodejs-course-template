const { validate } = require('../../lib/request.validator');
const { catchErrors } = require('../../lib/error-handler');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = require('../../common/config').JWT_SECRET_KEY;

const authenticateAction = catchErrors(async (req, res) => {
  await validate(req);
  const { body, container } = req;
  const { login, password } = body;
  const props = { login, password };
  const loginService = container.get('login.service');
  const user = await loginService.getUserByProps(props);
  const token = jwt.sign({ login: user.login }, JWT_SECRET_KEY);
  return res.header('Authorization', token).send({ token });
});

const loginController = {
  authenticateAction
};

module.exports = loginController;

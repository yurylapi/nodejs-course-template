const { validate } = require('../../lib/request.validator');
const { catchErrors } = require('../../lib/error-handler');
const { OK, NO_CONTENT } = require('http-status-codes');

const indexAction = catchErrors(async (req, res) => {
  await validate(req);
  const container = req.container;
  const usersService = container.get('user.service');
  const users = await usersService.getAll();
  res.status(OK).json(users);
});

const createAction = catchErrors(async (req, res) => {
  await validate(req);
  const { container, body: userData } = req;
  const usersService = container.get('user.service');
  const user = await usersService.create(userData);
  res.status(OK).json(user);
});

const updateAction = catchErrors(async (req, res) => {
  await validate(req);
  const { params, container, body: userData } = req;
  const usersService = container.get('user.service');
  const updatedUser = await usersService.update(params.id, userData);
  res.status(OK).json(updatedUser);
});

const deleteAction = catchErrors(async (req, res) => {
  await validate(req);
  const { params, container } = req;
  const usersService = container.get('user.service');
  await usersService.delete(params.id);
  res.sendStatus(NO_CONTENT);
});

const getByIdAction = catchErrors(async (req, res) => {
  await validate(req);
  const { params, container } = req;
  const usersService = container.get('user.service');
  const user = await usersService.getById(params.id);
  res.status(OK).json(user);
});

const userController = {
  indexAction,
  getByIdAction,
  createAction,
  updateAction,
  deleteAction
};

module.exports = userController;

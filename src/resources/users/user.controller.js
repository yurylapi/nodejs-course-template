const { validate } = require('../../lib/request.validator');
const { catchErrors } = require('../../lib/error-handler');

const indexAction = catchErrors(async (req, res) => {
  await validate(req);
  const container = req.container;
  const usersService = container.get('user.service');
  const users = await usersService.getAll();
  res.status(200).json(users);
});

const createAction = catchErrors(async (req, res) => {
  await validate(req);
  const container = req.container;
  const usersService = container.get('user.service');
  const userData = req.body;
  const user = await usersService.create(userData);
  res.status(200).json(user);
});

const updateAction = catchErrors(async (req, res) => {
  await validate(req);
  const id = req.params.id;
  const userData = req.body;
  const container = req.container;
  const usersService = container.get('user.service');
  const user = await usersService.update(id, userData);
  res.status(200).json(user);
});

const deleteAction = catchErrors(async (req, res) => {
  await validate(req);
  const id = req.params.id;
  const container = req.container;
  const usersService = container.get('user.service');
  await usersService.delete(id);
  res.sendStatus(204);
});

const getByIdAction = catchErrors(async (req, res) => {
  await validate(req);
  const id = req.params.id;
  const container = req.container;
  const usersService = container.get('user.service');
  const user = await usersService.getById(id);
  res.status(200).json(user);
});

const userController = {
  indexAction,
  getByIdAction,
  createAction,
  updateAction,
  deleteAction
};

module.exports = userController;

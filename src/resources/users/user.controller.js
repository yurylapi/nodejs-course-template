const { validate } = require('./user.validator');

const indexAction = async (req, res) => {
  const container = req.container;
  const usersService = container.get('user.service');
  const users = await usersService.getAll();
  res.json(users);
};

const createAction = async (req, res, next) => {
  try {
    await validate(req);
  } catch (err) {
    return next(err);
  }

  const container = req.container;
  const usersService = container.get('user.service');
  const userData = req.body;
  const user = await usersService.create(userData);
  res.json(user);
};

const updateAction = async (req, res, next) => {
  try {
    await validate(req);
    const id = req.params.id;
    const userData = req.body;
    const container = req.container;
    const usersService = container.get('user.service');
    const user = await usersService.update(id, userData);
    res.json(user);
  } catch (err) {
    return next(err);
  }
};

const deleteAction = async (req, res) => {};

const getByIdAction = async (req, res, next) => {
  try {
    await validate(req);
    const id = req.params.id;
    const container = req.container;
    const usersService = container.get('user.service');
    const user = await usersService.getById(id);
    res.json(user);
  } catch (err) {
    return next(err);
  }
};

const userController = {
  indexAction,
  getByIdAction,
  createAction,
  updateAction,
  deleteAction
};

module.exports = userController;

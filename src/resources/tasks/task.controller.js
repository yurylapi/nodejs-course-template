const { validate } = require('./task.validator');

const indexAction = async (req, res) => {
  const container = req.container;
  const taskService = container.get('task.service');
  const tasks = await taskService.getAll();
  res.json(tasks);
};

const createAction = async (req, res, next) => {
  try {
    await validate(req);
  } catch (err) {
    return next(err);
  }

  const container = req.container;
  const taskService = container.get('task.service');
  const taskData = req.body;
  const task = await taskService.create(taskData);
  res.json(task);
};

const updateAction = async (req, res, next) => {
  try {
    await validate(req);
    const id = req.params.id;
    const taskData = req.body;
    const container = req.container;
    const taskService = container.get('task.service');
    const task = await taskService.update(id, taskData);
    res.json(task);
  } catch (err) {
    return next(err);
  }
};

const deleteAction = async (req, res, next) => {
  try {
    await validate(req);
    const id = req.params.id;
    const container = req.container;
    const taskService = container.get('task.service');
    await taskService.delete(id);
    res.sendStatus(204);
  } catch (err) {
    return next(err);
  }
};

const getByIdAction = async (req, res, next) => {
  try {
    await validate(req);
    const id = req.params.id;
    const container = req.container;
    const taskService = container.get('task.service');
    const task = await taskService.getById(id);
    res.json(task);
  } catch (err) {
    return next(err);
  }
};

const taskController = {
  indexAction,
  getByIdAction,
  createAction,
  updateAction,
  deleteAction
};

module.exports = taskController;

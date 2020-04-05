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
    const container = req.container;
    const taskService = container.get('task.service');
    const taskData = req.body;
    const boardId = req.params.boardId;
    const task = await taskService.create(boardId, taskData);
    res.json(task);
  } catch (err) {
    return next(err);
  }
};

const updateAction = async (req, res, next) => {
  try {
    await validate(req);
    const id = req.params.id;
    const taskData = req.body;
    const container = req.container;
    const taskService = container.get('task.service');
    const task = await taskService.update(boardId, id, taskData);
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
    const boardId = req.params.boardId;
    await taskService.delete(boardId, id);
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
    const boardId = req.params.boardId;
    const task = await taskService.getById(boardId, id);
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

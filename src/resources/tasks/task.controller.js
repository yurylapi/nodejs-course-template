const { validate } = require('../../lib/request.validator');
const { catchErrors } = require('../../lib/error-handler');

const indexAction = catchErrors(async (req, res) => {
  await validate(req);
  const container = req.container;
  const taskService = container.get('task.service');
  const tasks = await taskService.getAll();
  res.status(200).json(tasks);
});

const createAction = catchErrors(async (req, res) => {
  await validate(req);
  const container = req.container;
  const taskService = container.get('task.service');
  const taskData = req.body;
  const boardId = req.params.boardId;
  const task = await taskService.create(boardId, taskData);
  res.status(200).json(task);
});

const updateAction = catchErrors(async (req, res) => {
  await validate(req);
  const id = req.params.id;
  const taskData = req.body;
  const container = req.container;
  const taskService = container.get('task.service');
  const boardId = req.params.boardId;
  const task = await taskService.update(boardId, id, taskData);
  res.status(200).json(task);
});

const deleteAction = catchErrors(async (req, res) => {
  await validate(req);
  const id = req.params.id;
  const container = req.container;
  const taskService = container.get('task.service');
  const boardId = req.params.boardId;
  await taskService.delete(boardId, id);
  res.sendStatus(204);
});

const getByIdAction = catchErrors(async (req, res) => {
  await validate(req);
  const id = req.params.id;
  const container = req.container;
  const taskService = container.get('task.service');
  const boardId = req.params.boardId;
  const task = await taskService.getById(boardId, id);
  res.status(200).json(task);
});

const taskController = {
  indexAction,
  getByIdAction,
  createAction,
  updateAction,
  deleteAction
};

module.exports = taskController;

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
  const { params, container, body: taskData } = req;
  const { boardId } = params;
  const taskService = container.get('task.service');
  const task = await taskService.create(boardId, taskData);
  res.status(200).json(task);
});

const updateAction = catchErrors(async (req, res) => {
  await validate(req);
  const { params, container, body: taskData } = req;
  const { boardId, id } = params;
  const taskService = container.get('task.service');
  const task = await taskService.update(boardId, id, taskData);
  res.status(200).json(task);
});

const deleteAction = catchErrors(async (req, res) => {
  await validate(req);
  const { params, container } = req;
  const { boardId, id } = params;
  const taskService = container.get('task.service');
  await taskService.delete(boardId, id);
  res.sendStatus(204);
});

const getByIdAction = catchErrors(async (req, res) => {
  await validate(req);
  const { params, container } = req;
  const { boardId, id } = params;
  const taskService = container.get('task.service');
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

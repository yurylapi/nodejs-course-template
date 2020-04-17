const { validate } = require('../../lib/request.validator');
const { catchErrors } = require('../../lib/error-handler');

// TODO: all actions may be split by several middlewares

const indexAction = catchErrors(async (req, res) => {
  await validate(req);
  const { container, params } = req;
  const { boardId } = params;

  const boardService = container.get('board.service');
  await boardService.getById(boardId);

  const taskService = container.get('task.service');
  const tasks = await taskService.getAll();
  res.status(200).json(tasks);
});

const createAction = catchErrors(async (req, res) => {
  await validate(req);
  const { params, container, body: taskData } = req;
  const { boardId } = params;

  const boardService = container.get('board.service');
  await boardService.getById(boardId);

  const taskService = container.get('task.service');
  const task = await taskService.create(boardId, taskData);
  res.status(200).json(task);
});

const updateAction = catchErrors(async (req, res) => {
  await validate(req);
  const { params, container, body: taskData } = req;
  const { boardId, id } = params;

  const boardService = container.get('board.service');
  await boardService.getById(boardId);

  const taskService = container.get('task.service');
  await taskService.getById(id);
  const task = await taskService.update(id, taskData);
  res.status(200).json(task);
});

const deleteAction = catchErrors(async (req, res) => {
  await validate(req);
  const { params, container } = req;
  const { boardId, id } = params;

  const boardService = container.get('board.service');
  await boardService.getById(boardId);

  const taskService = container.get('task.service');
  await taskService.delete(id);
  res.sendStatus(204);
});

const getByIdAction = catchErrors(async (req, res) => {
  await validate(req);
  const { params, container } = req;
  const { boardId, id } = params;

  const boardService = container.get('board.service');
  await boardService.getById(boardId);

  const taskService = container.get('task.service');
  const task = await taskService.getById(id);
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

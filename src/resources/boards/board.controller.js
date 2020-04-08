const { validate } = require('../../lib/request.validator');
const { catchErrors } = require('../../lib/error-handler');

const indexAction = catchErrors(async (req, res) => {
  await validate(req);
  const container = req.container;
  const boardService = container.get('board.service');
  const boards = await boardService.getAll();
  res.status(200).json(boards);
});

const createAction = catchErrors(async (req, res) => {
  await validate(req);
  const container = req.container;
  const boardService = container.get('board.service');
  const boardData = req.body;
  const board = await boardService.create(boardData);
  res.status(200).json(board);
});

const updateAction = catchErrors(async (req, res) => {
  await validate(req);
  const id = req.params.id;
  const boardData = req.body;
  const container = req.container;
  const boardService = container.get('board.service');
  const board = await boardService.update(id, boardData);
  res.status(200).json(board);
});

const deleteAction = catchErrors(async (req, res) => {
  await validate(req);
  const id = req.params.id;
  const container = req.container;
  const boardService = container.get('board.service');
  await boardService.delete(id);
  res.sendStatus(204);
});

const getByIdAction = catchErrors(async (req, res) => {
  await validate(req);
  const id = req.params.id;
  const container = req.container;
  const boardService = container.get('board.service');
  const board = await boardService.getById(id);
  res.status(200).json(board);
});

const boardController = {
  indexAction,
  getByIdAction,
  createAction,
  updateAction,
  deleteAction
};

module.exports = boardController;

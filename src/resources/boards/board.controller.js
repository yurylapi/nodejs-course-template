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
  const { container, body: boardData } = req;
  const boardService = container.get('board.service');
  const board = await boardService.create(boardData);
  res.status(200).json(board);
});

const updateAction = catchErrors(async (req, res) => {
  await validate(req);
  const { params, container, body: boardData } = req;
  const boardService = container.get('board.service');
  const board = await boardService.update(params.id, boardData);
  res.status(200).json(board);
});

const deleteAction = catchErrors(async (req, res) => {
  await validate(req);
  const { params, container } = req;
  const boardService = container.get('board.service');
  await boardService.delete(params.id);
  res.sendStatus(204);
});

const getByIdAction = catchErrors(async (req, res) => {
  await validate(req);
  const { params, container } = req;
  const boardService = container.get('board.service');
  const board = await boardService.getById(params.id);
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

const { validate } = require('./board.validator');

const indexAction = async (req, res) => {
  const container = req.container;
  const boardService = container.get('board.service');
  const boards = await boardService.getAll();
  res.json(boards);
};

const createAction = async (req, res, next) => {
  try {
    await validate(req);
  } catch (err) {
    return next(err);
  }

  const container = req.container;
  const boardService = container.get('board.service');
  const boardData = req.body;
  const board = await boardService.create(boardData);
  res.json(board);
};

const updateAction = async (req, res, next) => {
  try {
    await validate(req);
    const id = req.params.id;
    const boardData = req.body;
    const container = req.container;
    const boardService = container.get('board.service');
    const board = await boardService.update(id, boardData);
    res.json(board);
  } catch (err) {
    return next(err);
  }
};

const deleteAction = async (req, res, next) => {
  try {
    await validate(req);
    const id = req.params.id;
    const container = req.container;
    const boardService = container.get('board.service');
    await boardService.delete(id);
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
    const boardService = container.get('board.service');
    const board = await boardService.getById(id);
    res.json(board);
  } catch (err) {
    return next(err);
  }
};

const boardController = {
  indexAction,
  getByIdAction,
  createAction,
  updateAction,
  deleteAction
};

module.exports = boardController;

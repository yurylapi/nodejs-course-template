const Board = require('./board.model');
const { ErrorHandler } = require('../../lib/error-handler');

class BoardMemoryRepository {
  /**
   * @param BoardDataMapper
   */
  constructor(BoardDataMapper) {
    this.boards = [];
    this.boardDataMapper = BoardDataMapper;
  }

  async getAll() {
    return this.boards.map(board => this.boardDataMapper.toDomain(board));
  }

  async save(boardData) {
    const board = new Board(boardData);
    this.boards.push(board);
    return this.boardDataMapper.toDomain(board);
  }

  async update(id, boardData) {
    const board = await this._getBoardInstance(id).catch(err => {
      throw err;
    });
    const updatedBoard = new Board({ ...board, ...boardData });
    this._updateBoardStorage(updatedBoard);
    return this.boardDataMapper.toDomain(updatedBoard);
  }

  async getById(id) {
    const desiredBoard = await this._getBoardInstance(id).catch(err => {
      throw err;
    });
    return this.boardDataMapper.toDomain(desiredBoard);
  }

  async delete(id) {
    this.boards = this.boards.filter(board => board.id !== id);
  }

  async _getBoardInstance(id) {
    const desiredBoard = this.boards.find(board => board.id === id);
    if (!desiredBoard) {
      throw new ErrorHandler(404, 'Board has not been found');
    }
    return desiredBoard;
  }

  _updateBoardStorage(updatedBoard) {
    this.boards = this.boards.map(board => {
      return board.id === updatedBoard.id ? updatedBoard : board;
    });
  }
}

module.exports.default = BoardMemoryRepository;

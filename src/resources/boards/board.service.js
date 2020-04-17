const { NOT_FOUND, getStatusText } = require('http-status-codes');
const { ErrorHandler } = require('../../lib/error-handler');

class BoardService {
  /**
   * @param BoardRepository
   * @param TaskService
   */
  constructor(BoardRepository, TaskService) {
    this.boardRepository = BoardRepository;
    this.taskService = TaskService;
  }

  async getAll() {
    return this.boardRepository.getAll();
  }

  async create(boardData) {
    return this.boardRepository.create(boardData);
  }

  async update(boardId, boardData) {
    const board = await this.boardRepository.getById(boardId);
    await this._validateBoard(board);
    return this.boardRepository.update(boardId, boardData);
  }

  async getById(boardId) {
    const board = await this.boardRepository.getById(boardId);
    await this._validateBoard(board);
    return board;
  }

  async delete(boardId) {
    const board = await this.boardRepository.getById(boardId);
    await this._validateBoard(board);
    const tasks = await this.taskService.getAll();
    tasks.map(async task => {
      if (task.getBoardId() === boardId) {
        await this.taskService.delete(task.getId());
      }
    });
    return this.boardRepository.delete(boardId);
  }

  /**
   * @param {Object} board
   * @return {Promise<void>}
   * @private
   */
  async _validateBoard(board) {
    if (typeof board !== 'object' || !board) {
      throw new ErrorHandler(NOT_FOUND, getStatusText(NOT_FOUND));
    }
  }
}

module.exports.default = BoardService;

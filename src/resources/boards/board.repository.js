const boardColumnModel = require('./board.column.model');

class BoardRepository {
  /**
   * @param BoardDataMapper
   */
  constructor(BoardDataMapper) {
    this.boardModel = require('./board.model'); // TODO: re-consider this solution
    this.boardDataMapper = BoardDataMapper;
  }

  async getAll() {
    const boards = await this.boardModel.find({}).exec();
    return boards.map(board => this.boardDataMapper.toDomain(board));
  }

  async getById(id) {
    const board = await this.boardModel.findById(id).exec();
    return this.boardDataMapper.toDomain(board);
  }

  async getBoardByProps(props) {
    return this.boardModel.find(props);
  }

  async update(boardId, board) {
    const updatedBoard = await this.boardModel.findByIdAndUpdate(
      boardId,
      board,
      {
        new: true
      }
    );
    return this.boardDataMapper.toDomain(updatedBoard);
  }

  async create(board) {
    if (this._hasColumns(board)) {
      board.columns = await this._addColumns(board.columns);
    }
    const createdBoard = await this.boardModel.create(board);

    return this.boardDataMapper.toDomain(createdBoard);
  }

  async delete(id) {
    return this.boardModel.findOneAndDelete({ _id: id });
  }

  /**
   * @param {Array} columns
   * @returns {Promise<[]>}
   * @private
   */
  async _addColumns(columns) {
    return columns.map(column => new boardColumnModel(column));
  }

  /**
   * @param {Object} board
   * @returns {boolean}
   * @private
   */
  _hasColumns(board) {
    return !!board.columns;
  }
}

module.exports.default = BoardRepository;

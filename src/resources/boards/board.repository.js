class BoardRepository {
  /**
   * @param BoardDataMapper
   */
  constructor(BoardDataMapper) {
    this.boardModel = require('./board.model'); // TODO: re-consider this solution
    this.boardColumnModel = require('./board.column.model'); // TODO: re-consider this solution
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
    const createdBoard = await this.boardModel.create(board);
    return this.boardDataMapper.toDomain(createdBoard);
  }

  async delete(id) {
    return this.boardModel.findOneAndDelete({ _id: id });
  }
}

module.exports.default = BoardRepository;

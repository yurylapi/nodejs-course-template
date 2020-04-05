const uuid = require('uuid');
const BoardColumn = require('./board.column.model');

class Board {
  constructor({ id = uuid(), title = 'string', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(column => new BoardColumn(column));
  }

  /**
   * @return {BoardColumn[]}
   */
  getColumns() {
    return this.columns;
  }

  /**
   * @return {String}
   */
  getTitle() {
    return this.title;
  }

  /**
   * @return {String}
   */
  getId() {
    return this.id;
  }
}

module.exports = Board;

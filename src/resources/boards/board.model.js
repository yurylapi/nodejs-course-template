const uuid = require('uuid');
const BoardColumn = require('./board.column.model');

class Board {
  constructor({ id = uuid(), title = 'string', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(column => new BoardColumn(column));
  }

  getColumns() {
    return this.columns;
  }

  getTitle() {
    return this.title;
  }

  getId() {
    return this.id;
  }
}

module.exports = Board;

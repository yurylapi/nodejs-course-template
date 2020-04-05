const uuid = require('uuid');

class BoardColumn {
  constructor({ id = uuid(), title = 'string', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = BoardColumn;

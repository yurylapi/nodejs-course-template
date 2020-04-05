const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title,
    order = 0,
    description = '',
    userId
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
  }

  getDescription() {
    return this.description;
  }

  getOrder() {
    return this.order;
  }

  getTitle() {
    return this.title;
  }

  getId() {
    return this.id;
  }
}

module.exports = Board;

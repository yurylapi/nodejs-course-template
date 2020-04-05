const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title,
    order = 0,
    description = '',
    userId,
    boardId,
    columnId
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
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

  getUserId() {
    return this.userId;
  }

  getBoardId() {
    return this.boardId;
  }

  getColumnId() {
    return this.columnId;
  }

  /**
   * @param {String|null} value
   * @returns {Task}
   */
  setUserId(value) {
    this.userId = value;
    return this;
  }
}

module.exports = Task;

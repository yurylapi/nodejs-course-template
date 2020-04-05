const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title,
    order = 0,
    description = '',
    userId = null,
    boardId,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId ? userId : null;
    this.boardId = boardId;
    this.columnId = columnId ? userId : null;
  }

  /**
   * @return {String}
   */
  getDescription() {
    return this.description;
  }

  /**
   * @return {Number}
   */
  getOrder() {
    return this.order;
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

  /**
   * @returns {String|null}
   */
  getUserId() {
    return this.userId;
  }

  /**
   * @returns {String}
   */
  getBoardId() {
    return this.boardId;
  }

  /**
   * @returns {String|null}
   */
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

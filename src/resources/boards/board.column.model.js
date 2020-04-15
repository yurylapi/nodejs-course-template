const uuid = require('uuid');

class BoardColumn {
  constructor({ id = uuid(), title = 'string', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  /**
   * @return {String}
   */
  getId() {
    return this.id;
  }

  /**
   * @return {String}
   */
  getTitle() {
    return this.title;
  }

  /**
   * @returns {Number}
   */
  getOrder() {
    return this.order;
  }
}

module.exports = BoardColumn;

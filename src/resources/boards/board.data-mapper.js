const EntityDataMapper = require('../../lib/entity-data-mapper');

class BoardDataMapper extends EntityDataMapper {
  toDomain(entity) {
    const { id, title, columns } = entity;
    const columnsToDomain = this._columnsToDomain(columns);
    return { id, title, columnsToDomain };
  }

  /**
   * @param {Array} columns
   * @returns {Array}
   * @private
   */
  _columnsToDomain(columns) {
    return columns.map(column => {
      const { _id: id, title, order } = column;
      return { id, title, order };
    });
  }
}

module.exports.default = BoardDataMapper;

const EntityDataMapper = require('../../lib/entity-data-mapper');

class BoardDataMapper extends EntityDataMapper {
  toDomain(entity) {
    if (this.isNull(entity)) {
      return null;
    }
    const { id, title } = entity;
    const columns = this._columnsToDomain(entity.columns);
    return { id, title, columns };
  }

  /**
   * @param {Array} columns
   * @returns {Array}
   * @private
   */
  _columnsToDomain(columns) {
    return columns.map(column => {
      const id = column._id || column.id;
      const { title, order } = column;
      return { id, title, order };
    });
  }
}

module.exports.default = BoardDataMapper;

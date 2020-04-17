const EntityDataMapper = require('../../lib/entity-data-mapper');

class TaskDataMapper extends EntityDataMapper {
  toDomain(entity) {
    if (this.isNull(entity)) {
      return null;
    }
    const { id, title, description, order, boardId } = entity;
    const columnId = this._nullAcceptableValue(entity.columnId);
    const userId = this._nullAcceptableValue(entity.userId);
    return { id, title, description, order, userId, boardId, columnId };
  }

  /**
   * @param {String} value
   * @returns {String|null}
   * @private
   */
  _nullAcceptableValue(value) {
    return value !== '' && value !== 'undefined' ? value : null;
  }
}

module.exports.default = TaskDataMapper;

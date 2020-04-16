const EntityDataMapper = require('../../lib/entity-data-mapper');

class UserDataMapper extends EntityDataMapper {
  toDomain(entity) {
    if (this._isNull(entity)) {
      return null;
    }
    const { id, name, login } = entity;
    return { id, name, login };
  }

  _isNull(entity) {
    return typeof entity === 'object' && !entity;
  }
}

module.exports.default = UserDataMapper;

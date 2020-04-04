const EntityDataMapper = require('../../lib/entity-data-mapper');

class UserDataMapper extends EntityDataMapper {
  toDomain(entity) {
    const { id, name, login } = entity;
    return { id, name, login };
  }
}

module.exports.default = UserDataMapper;

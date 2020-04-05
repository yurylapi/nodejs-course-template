const EntityDataMapper = require('../../lib/entity-data-mapper');

class BoardDataMapper extends EntityDataMapper {
  toDomain(entity) {
    return super.toDomain(entity);
  }
}

module.exports.default = BoardDataMapper;

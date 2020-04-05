const EntityDataMapper = require('../../lib/entity-data-mapper');

class TaskDataMapper extends EntityDataMapper {
  toDomain(entity) {
    return super.toDomain(entity);
  }
}

module.exports.default = TaskDataMapper;

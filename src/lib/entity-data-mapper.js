class EntityDataMapper {
  toDomain(entity) {
    return entity;
  }

  toDalEntity(domain) {
    return domain;
  }

  /**
   * @param {Object} entity
   * @returns {boolean}
   */
  isNull(entity) {
    return typeof entity === 'object' && !entity;
  }
}

module.exports = EntityDataMapper;

const User = require('./user.model');
const { ErrorHandler } = require('../../lib/error-handler');

class UserMemoryRepository {
  /**
   * @param UserDataMapper
   */
  constructor(UserDataMapper) {
    this.users = [];
    this.userDataMapper = UserDataMapper;
  }

  async getAll() {
    return this.users.map(user => this.userDataMapper.toDomain(user));
  }

  async save(userData) {
    const user = new User(userData);
    this.users.push(user);
    return this.userDataMapper.toDomain(user);
  }

  async update(id, userData) {
    const user = await this._getUserInstance(id).catch(err => {
      throw err;
    });
    const updatedUser = new User({ ...user, ...userData });
    this._updateUserStorage(updatedUser);
    return this.userDataMapper.toDomain(updatedUser);
  }

  async getById(id) {
    const desiredUser = await this._getUserInstance(id).catch(err => {
      throw err;
    });
    return this.userDataMapper.toDomain(desiredUser);
  }

  async delete(id) {
    this.users = this.users.filter(user => user.id !== id);
  }

  async _getUserInstance(id) {
    const desiredUser = this.users.find(user => user.id === id);
    if (!desiredUser) {
      throw new ErrorHandler(404, 'User has not been found');
    }
    return desiredUser;
  }

  _updateUserStorage(updatedUser) {
    this.users = this.users.map(user => {
      return user.id === updatedUser.id ? updatedUser : user;
    });
  }
}

module.exports.default = UserMemoryRepository;

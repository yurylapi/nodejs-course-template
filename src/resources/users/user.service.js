const { NOT_FOUND, getStatusText } = require('http-status-codes');
const { ErrorHandler } = require('../../lib/error-handler');

class UserService {
  constructor(UserRepository, TaskService) {
    this.userRepository = UserRepository;
    this.taskService = TaskService;
  }

  async getAll() {
    return this.userRepository.getAll();
  }

  async create(user) {
    return this.userRepository.create(user);
  }

  async update(userId, userData) {
    const user = await this.userRepository.getById(userId);
    await this._validateUser(user);
    return this.userRepository.update(userId, userData);
  }

  async getById(userId) {
    const user = await this.userRepository.getById(userId);
    await this._validateUser(user);
    return user;
  }

  async delete(userId) {
    const user = await this.userRepository.getById(userId);
    await this._validateUser(user);
    await this.userRepository.delete(userId);
    await this._updateTasks(userId);
  }

  async _updateTasks(userId) {
    const tasks = await this.taskService.getAll();

    Promise.all(
      tasks.map(async task => {
        if (task.getUserId() === userId) {
          task.setUserId(null);
          await this.taskService.update(task.getId(), task);
        }
      })
    ).catch(err => {
      throw err;
    });
  }

  /**
   * @param {Object} user
   * @return {Promise<void>}
   * @private
   */
  async _validateUser(user) {
    if (typeof user !== 'object' || !user) {
      throw new ErrorHandler(NOT_FOUND, getStatusText(NOT_FOUND));
    }
  }
}

module.exports.default = UserService;

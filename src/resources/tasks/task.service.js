const { NOT_FOUND, getStatusText } = require('http-status-codes');
const { ErrorHandler } = require('../../lib/error-handler');

class TaskService {
  constructor(TaskRepository) {
    this.taskRepository = TaskRepository;
  }

  async getAll() {
    return this.taskRepository.getAll();
  }

  async create(boardId, taskData) {
    taskData = { ...taskData, boardId };
    return this.taskRepository.create(taskData);
  }

  async update(taskId, taskData) {
    const task = await this.taskRepository.getById(taskId);
    await this._validateTask(task);
    return this.taskRepository.update(taskId, taskData);
  }

  async getById(taskId) {
    const task = await this.taskRepository.getById(taskId);
    await this._validateTask(task);
    return task;
  }

  async delete(taskId) {
    const task = await this.taskRepository.getById(taskId);
    await this._validateTask(task);
    return this.taskRepository.delete(taskId);
  }

  /**
   * @param {Object} task
   * @return {Promise<void>}
   * @private
   */
  async _validateTask(task) {
    if (typeof task !== 'object' || !task) {
      throw new ErrorHandler(NOT_FOUND, getStatusText(NOT_FOUND));
    }
  }
}

module.exports.default = TaskService;

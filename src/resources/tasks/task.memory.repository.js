const Task = require('./task.model');
const { ErrorHandler } = require('../../lib/error-handler');

class TaskMemoryRepository {
  /**
   * @param TaskDataMapper
   */
  constructor(TaskDataMapper) {
    this.tasks = [];
    this.taskDataMapper = TaskDataMapper;
  }

  async getAll() {
    return this.tasks.map(task => this.taskDataMapper.toDomain(task));
  }

  async save(taskData) {
    const task = new Task(taskData);
    this.tasks.push(task);
    return this.taskDataMapper.toDomain(task);
  }

  async update(id, taskData) {
    const task = await this._getTaskInstance(id).catch(err => {
      throw err;
    });
    const updatedTask = new Task({ ...task, ...taskData });
    this._updateTaskStorage(updatedTask);
    return this.taskDataMapper.toDomain(updatedTask);
  }

  async getById(id) {
    const desiredTask = await this._getTaskInstance(id).catch(err => {
      throw err;
    });
    return this.taskDataMapper.toDomain(desiredTask);
  }

  async delete(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  async _getTaskInstance(id) {
    const desiredTask = this.tasks.find(task => task.id === id);
    if (!desiredTask) {
      throw new ErrorHandler(404, 'Task has not been found');
    }
    return desiredTask;
  }

  _updateTaskStorage(updatedTask) {
    this.tasks = this.tasks.map(task => {
      return task.id === updatedTask.id ? updatedTask : task;
    });
  }
}

module.exports.default = TaskMemoryRepository;

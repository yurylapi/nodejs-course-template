class TaskRepository {
  /**
   * @param TaskDataMapper
   */
  constructor(TaskDataMapper) {
    this.taskModel = require('./task.model'); // TODO: re-consider this solution
    this.taskDataMapper = TaskDataMapper;
  }

  async getAll() {
    const tasks = await this.taskModel.find({}).exec();
    return tasks.map(task => this.taskDataMapper.toDomain(task));
  }

  async getById(id) {
    const task = await this.taskModel.findById(id).exec();
    return this.taskDataMapper.toDomain(task);
  }

  async getTaskByProps(props) {
    return this.taskModel.find(props);
  }

  async update(taskId, task) {
    const updatedTask = await this.taskModel.findByIdAndUpdate(taskId, task, {
      new: true
    });
    return this.taskDataMapper.toDomain(updatedTask);
  }

  async create(task) {
    const createdTask = await this.taskModel.create(task);
    return this.taskDataMapper.toDomain(createdTask);
  }

  async delete(id) {
    return this.taskModel.findOneAndDelete({ _id: id });
  }
}

module.exports.default = TaskRepository;

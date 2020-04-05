class UserService {
  constructor(UserMemoryRepository, TaskMemoryRepository) {
    this.userRepository = UserMemoryRepository;
    this.taskRepository = TaskMemoryRepository;
  }

  async getAll() {
    return this.userRepository.getAll();
  }

  async create(userData) {
    return this.userRepository.save(userData);
  }

  async update(id, userData) {
    return this.userRepository.update(id, userData);
  }

  async getById(id) {
    return this.userRepository.getById(id);
  }

  async delete(userId) {
    await this.userRepository.delete(userId);
    await this._updateTasks(userId);
  }

  async _updateTasks(userId) {
    const tasks = await this.taskRepository.getAll();

    tasks.map(async task => {
      if (task.getUserId() === userId) {
        task.setUserId(null);
        await this.taskRepository
          .update(task)
          .catch(err => console.log(err.message));
      }
    });
  }
}

module.exports.default = UserService;

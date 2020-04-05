class TaskService {
  constructor(TaskMemoryRepository) {
    this.taskRepository = TaskMemoryRepository;
  }

  async getAll() {
    return this.taskRepository.getAll();
  }

  async create(userData) {
    return this.taskRepository.save(userData);
  }

  async update(id, userData) {
    return this.taskRepository.update(id, userData);
  }

  async getById(id) {
    return this.taskRepository.getById(id);
  }

  async delete(id) {
    return this.taskRepository.delete(id);
  }
}

module.exports.default = TaskService;

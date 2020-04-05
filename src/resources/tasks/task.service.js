class TaskService {
  constructor(TaskMemoryRepository, BoardMemoryRepository) {
    this.taskRepository = TaskMemoryRepository;
    this.boardRepository = BoardMemoryRepository;
  }

  async getAll() {
    return this.taskRepository.getAll();
  }

  async create(boardId, taskData) {
    const board = await this.boardRepository.getById(boardId).catch(err => {
      throw err;
    });

    taskData = { ...taskData, boardId: board.getId() };
    return this.taskRepository.save(taskData);
  }

  async update(boardId, id, taskData) {
    return this.taskRepository.update(id, taskData);
  }

  async getById(boardId, id) {
    return this.taskRepository.getById(id);
  }

  async delete(id) {
    return this.taskRepository.delete(id);
  }
}

module.exports.default = TaskService;

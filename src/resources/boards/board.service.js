class BoardService {
  constructor(BoardMemoryRepository, TaskMemoryRepository) {
    this.boardRepository = BoardMemoryRepository;
    this.taskRepository = TaskMemoryRepository;
  }

  async getAll() {
    return this.boardRepository.getAll();
  }

  async create(boardData) {
    return this.boardRepository.save(boardData);
  }

  async update(boardId, boardData) {
    return this.boardRepository.update(boardId, boardData);
  }

  async getById(boardId) {
    return this.boardRepository.getById(boardId).catch(err => {
      throw err;
    });
  }

  async delete(boardId) {
    const tasks = await this.taskRepository.getAll();
    tasks.map(async task => {
      if (task.getBoardId() === boardId) {
        await this.taskRepository.delete(task.getId());
      }
    });
    return this.boardRepository.delete(boardId);
  }
}

module.exports.default = BoardService;

class BoardService {
  constructor(BoardMemoryRepository) {
    this.boardRepository = BoardMemoryRepository;
  }

  async getAll() {
    return this.boardRepository.getAll();
  }

  async create(userData) {
    return this.boardRepository.save(userData);
  }

  async update(id, userData) {
    return this.boardRepository.update(id, userData);
  }

  async getById(id) {
    return this.boardRepository.getById(id);
  }

  async delete(id) {
    return this.boardRepository.delete(id);
  }
}

module.exports.default = BoardService;

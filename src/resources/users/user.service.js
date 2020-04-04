class UserService {
  constructor(UserMemoryRepository) {
    this.userRepository = UserMemoryRepository;
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
}

module.exports.default = UserService;

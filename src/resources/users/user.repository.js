class UserRepository {
  /**
   * @param UserDataMapper
   */
  constructor(UserDataMapper) {
    this.userModel = require('./user.model'); // TODO: re-consider this solution
    this.userDataMapper = UserDataMapper;
  }

  async getAll() {
    const users = await this.userModel.find({}).exec();
    return users.map(user => this.userDataMapper.toDomain(user));
  }

  async getById(id) {
    const user = await this.userModel.findById(id).exec();
    return this.userDataMapper.toDomain(user);
  }

  async getUserByProps(props) {
    return this.userModel.findOne(props).exec();
  }

  async update(userId, user) {
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, user, {
      new: true
    });
    return this.userDataMapper.toDomain(updatedUser);
  }

  async create(user) {
    const createdUser = await this.userModel.create(user);
    return this.userDataMapper.toDomain(createdUser);
  }

  async delete(id) {
    return this.userModel.findOneAndDelete({ _id: id });
  }
}

module.exports.default = UserRepository;

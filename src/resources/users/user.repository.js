const User = require('./user.model');

class UserRepository {
  /**
   * @param UserModel
   * @param UserDataMapper
   */
  constructor(UserModel, UserDataMapper) {
    this.userModel = UserModel;
    this.userDataMapper = UserDataMapper;
  }

  async getAll() {
    const users = await User.find({});
    return this.userModel.find({});
  }

  async getById(id) {
    return this.userModel.findById(id).exec();
  }

  async getUserByProps(props) {
    throw new Error();
  }

  async save(user) {
    const createdUser = await this.userModel.create(user);
  }
}

module.exports.default = UserRepository;

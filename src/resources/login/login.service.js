const { FORBIDDEN, getStatusText } = require('http-status-codes');
const { ErrorHandler } = require('../../lib/error-handler');

class LoginService {
  /**
   * @param UserService
   */
  constructor(UserService) {
    this.userService = UserService;
    this.bcrypt = require('bcrypt');
  }

  /**
   * @param {Object} props
   * @returns {Promise<Object>}
   */
  async getUserByLoginPassword(props) {
    const { login, password } = props;
    const user = await this.userService.getUserByProps({ login });

    if (!user) {
      throw new ErrorHandler(FORBIDDEN, getStatusText(FORBIDDEN));
    }

    const match = await this.bcrypt.compare(password, user.password);

    if (!match) {
      throw new ErrorHandler(FORBIDDEN, getStatusText(FORBIDDEN));
    }

    return user;
  }
}

module.exports.default = LoginService;

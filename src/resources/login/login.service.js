class LoginService {
  /**
   * @param UserService
   */
  constructor(UserService) {
    this.userService = UserService;
  }

  /**
   * @param {Object} props
   * @returns {Promise<Object>}
   */
  async getUserByProps(props) {
    return this.userService.getUserByProps(props);
  }
}

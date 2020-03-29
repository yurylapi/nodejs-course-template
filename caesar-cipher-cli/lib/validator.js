module.exports = {
  /**
   * @param value
   * @return {String}
   */
  actionTypeValidator: value => {
    const types = ['encode', 'decode'];

    return types.includes(value) === false
      ? process.stderr.write(
          `Wrong action type. Possible options: ${types.join(', ')}\n`
        )
      : value;
  }
};

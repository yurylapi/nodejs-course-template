const uuid = require('uuid');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: String,
    password: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;

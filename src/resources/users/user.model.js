const uuid = require('uuid');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: String,
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 5
    },
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

userSchema.pre('save', async function preSave(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.pre('findOneAndUpdate', async function preUpdate(next) {
  this._update.password = await bcrypt.hash(this._update.password, 8);
  next();
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;

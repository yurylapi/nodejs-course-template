const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const boardSchema = new Schema(
  {
    title: String,
    columns: Array,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

const BoardModel = mongoose.model('Board', boardSchema);

module.exports = BoardModel;

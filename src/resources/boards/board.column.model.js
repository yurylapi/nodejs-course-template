const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const boardColumnSchema = new Schema(
  {
    title: String,
    order: Number,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

const BoardColumnModel = mongoose.model('BoardColumn', boardColumnSchema);

module.exports = BoardColumnModel;

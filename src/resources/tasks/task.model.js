const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: String,
    order: {
      type: Number,
      default: 0
    },
    description: String,
    userId: String,
    boardId: String,
    columnId: {
      type: String
    },
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = TaskModel;

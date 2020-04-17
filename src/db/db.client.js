const UserModel = require('../resources/users/user.model');
const BoardModel = require('../resources/boards/board.model');
const BoardColumnModel = require('../resources/boards/board.column.model');
const Task = require('../resources/tasks/task.model');
const mongoose = require('mongoose');

const columns = [
  {
    title: 'Column #1',
    order: 0
  },
  {
    title: 'Column #2',
    order: 1
  }
];

const boards = [...new Array(2)].map(
  (_, idx) =>
    new BoardModel({
      title: `Board #${idx + 1}`,
      columns: []
    })
);

// const tasks = [...new Array(5)].map((_, idx) => {
//   const oneOrZero = idx % 2;
//   const boardId = boards[oneOrZero].id;
//   const columnId = boards[oneOrZero].columns[oneOrZero].id;
//   return new Task({
//     title: `Task #${idx + 1}`,
//     order: idx + 1,
//     boardId,
//     columnId
//   });
// });

const users = [
  new UserModel({
    name: 'user1',
    login: 'admin',
    password: 'admin'
  }),
  new UserModel({
    name: 'user2',
    login: 'login2',
    password: 'password2'
  })
];

const connectionToDb = callback => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', async () => {
    console.log('DB is connected!');
    await db.dropDatabase();

    // TODO start: Test data upgrade script
    users.forEach(user => user.save());
    boards.forEach(board => {
      board.columns = columns.map(column => {
        const newColumn = new BoardColumnModel(column);
        newColumn.save();
        return newColumn;
      });
      board.save();
    });
    // TODO end: Test data upgrade script
    callback();
  });
};

module.exports = { users, boards, connectionToDb };

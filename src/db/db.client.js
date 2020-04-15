const User = require('../resources/users/user.model').default;
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');
const mongoose = require('mongoose');

const boards = [...new Array(2)].map(
  (_, idx) =>
    new Board({
      title: `Board #${idx + 1}`,
      columns: [
        {
          title: 'Column #1',
          order: 0
        },
        {
          title: 'Column #2',
          order: 1
        }
      ]
    })
);
const tasks = [...new Array(5)].map((_, idx) => {
  const oneOrZero = idx % 2;
  const boardId = boards[oneOrZero].getId();
  const columnId = boards[oneOrZero].getColumns()[oneOrZero].getId();
  return new Task({
    title: `Task #${idx + 1}`,
    order: idx + 1,
    boardId,
    columnId
  });
});
const users = [
  new User({
    name: 'user1',
    login: 'admin',
    password: 'admin'
  }),
  new User({
    name: 'user2',
    login: 'login2',
    password: 'password2'
  })
];

const connectionToDb = callback => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', () => {
    console.log('DB is connected!');
    db.dropDatabase();
    users.forEach(user => user.save());
    callback();
  });
};

module.exports = { tasks, users, boards, connectionToDb };

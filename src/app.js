const express = require('express');
const { handleError } = require('./lib/error-handler');
const { reqLoggerMiddleware } = require('./lib/logger');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const NodeInjectionMiddleware = require('node-dependency-injection-express-middleware')
  .default;

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const options = {
  serviceFilePath: path.join(__dirname, './common/service.yaml'),
  containerReferenceAsService: true,
  defaultDir: path.join(__dirname, './resources')
};
app.use(new NodeInjectionMiddleware(options).middleware());

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use((err, req, res, next) => {
  handleError(err, res);
});

module.exports = app;

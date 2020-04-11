const { PORT } = require('./common/config');
const app = require('./app');
const { logger } = require('./lib/logger');

// TODO:: remove after third cross-check
// setTimeout(() => {
//   throw new Error('Oops!');
// }, 1500)
//
// setTimeout(() => {
//   Promise.reject(new Error('Oops!'));
// }, 1500)

process
  .on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at Promise', reason, promise);
  })
  .on('uncaughtException', err => {
    logger.error(`Uncaught Exception thrown: ${err.message}`, err);
  });

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

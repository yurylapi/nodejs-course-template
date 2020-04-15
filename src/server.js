const { PORT } = require('./common/config');
const { connectionToDb } = require('./db/db.client');
const app = require('./app');
const { logger } = require('./lib/logger');

connectionToDb(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});

process
  .on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at Promise', reason, promise);
  })
  .on('uncaughtException', err => {
    logger.error(`Uncaught Exception thrown: ${err.message}`, err);
  });

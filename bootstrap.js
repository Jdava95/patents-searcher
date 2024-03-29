const connection = require('./db/connection');
const server = require('./server.js');

/**
 * Поднять все что нужно для работы приложения
 * @return {Promise}
 */
async function bootstrap() {
  await Promise.all([connection(), server()]);
  console.info('Database and server was stared');
}

module.exports = bootstrap;

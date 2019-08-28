const connection = require('./db/connection');
const server = require('./server.js');

/**
 * Поднять все что нужно для работы приложения
 * @return {Promise}
 */
async function bootstrap() {
  await Promise.all([connection(), server().catch((err) => {
    console.error(err);
    process.exit(1);
  })]);
  console.info('was started');
}

module.exports = bootstrap;

const connection = require('./db/connection');
const server = require('./server.js');


/**
 * Подключение к Базе Данных а так же запуск сервера
 */
async function bootstrap() {
  await Promise.all([connection(), server()])
  console.info('was started')
}

module.exports = bootstrap;

const connection = require('./db/connection');
const server = require('./server.js');

async function bootstrap() {
  await Promise.all([connection(), server()])
  console.log('was started')
};

module.exports = bootstrap;

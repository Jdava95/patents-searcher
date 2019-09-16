const bootstrap = require('../bootstrap');
const checkUpdate = require('./checkUpdate');
const getConfig = require('../lib/getConfig');
const config = getConfig('config');

/**
 * Обновление через сеть
 */
async function networkUpdate() {
  let url = config[process.argv[2]];
  let Model = require(`../storage/${process.argv[2]}.js`);
  let Name = process.argv[2];

  await bootstrap();
  await checkUpdate(url, Model, Name);
}

if (module.parent) {
  module.exports = networkUpdate;
} else {
  networkUpdate();
}

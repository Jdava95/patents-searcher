const mongoose = require('mongoose');
const getStorageConfig = require('../lib/getStorageConfig');
require('../storage/Patent');
require('../storage/Version');

/**
 * Подключение к монгодб
 */
function connection() {
  return new Promise((resolve, reject) => {
    const config = getStorageConfig();
    mongoose.connect(`${config.bind}:${config.port}/${config.database}`, {useNewUrlParser: true});
    const db = mongoose.connection;
    const onError = err => {
      db.removeListener('open', onOpen);
      return reject(err);
    };
    const onOpen = () => {
      db.removeListener('error', onError);
      return resolve(db);
    };
    db.once('error', onError);
    db.once('open', onOpen);
  })
}

module.exports = connection;

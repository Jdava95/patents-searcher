const mongoose = require('mongoose');
const getConfig = require('../lib/getConfig');
const config = getConfig('storage');
mongoose.set('useCreateIndex', true);
require('../storage/ProgramRegistry');
require('../storage/Version');
require('../storage/Trademark');
require('../storage/Patent');

/**
 * Подключение к монгодб
 * @returns {Promise}
 */
function connection() {
  return new Promise((resolve, reject) => {
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

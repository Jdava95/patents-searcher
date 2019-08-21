const mongoose = require('mongoose');
const getStorageConfig = require('../lib/getStorageConfig');
require('../storage/Patent');

function connection() {
  return new Promise((resolve, reject) => {
    mongoose.connect(`${getStorageConfig().bind}:${getStorageConfig().port}/${getStorageConfig().database}`, {useNewUrlParser: true});
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

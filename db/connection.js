const mongoose = require('mongoose');
const storage = require('../default/storage');
require('../storage/Patent');

function connection() {
  return new Promise((resolve, reject) => {
    mongoose.connect(`${storage.bind}:${storage.port}/${storage.database}`, {useNewUrlParser: true});
    const db = mongoose.connection;
    const onError = err => {
      reject(err);
      db.removeListener('open', onOpen);
    };
    const onOpen = () => {
      resolve(db);
      db.removeListener('error', onError);
    };
    db.once('error', onError);
    db.once('open', onOpen);
  })
}

module.exports = connection;

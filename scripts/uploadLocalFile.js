const fileHandler = require('../lib/fileHandler');
const path = require('path');
const connection = require('../db/connection');

/**
 * Обновление через локальный файл
 */
async function uploadLocalFile() {
  let Model = require(`../storage/${process.env.Name}`);
  let Name = process.env.Name;
  let PathToFile = path.join(__dirname, process.env.Path);
  
  await connection();
  await fileHandler(Model, { name: Name, path: PathToFile });
}

if (module.parent) {
  module.exports = uploadLocalFile;
} else {
  uploadLocalFile();
}

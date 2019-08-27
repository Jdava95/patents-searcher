const urlHandler = require('../urlHandler');
const uploadData = require('../storage/uploadData');
const Version = require('../storage/Version');

/**
 * Проверяет сайта роспатента на наличие новых файлов 
 * Для добавления и обновления данных в коллекции
 */
async function checkUpdate() {
  const url = await urlHandler();
  const check = await Version.getLastVersion(url);
  if(check)return console.info('URL уже лежит в базе.')
  console.info('Запись пошла.')
  await uploadData(url);
  await Version.addNewActualUrl(url);
  console.info('Завершено.');
}

module.exports = checkUpdate;

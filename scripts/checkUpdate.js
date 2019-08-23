const urlHandler = require('../urlHandler');
const uploadData = require('../storage/uploadData');
const methods  = require('../storage/methods');


/**
 * Проверяет сайта роспатента на наличие новых файлов 
 * Для добавления и обновления данных в коллекции
 */
async function checkUpdate() {
  const url = await urlHandler();
  const check = await methods.getLastVersion(url);
  if(check)return console.log('юрл уже лежит в базе. Программа окончена')
  console.info('recording is gone')
  await uploadData(url);
  await methods.addNewUrl(url);
  console.info('dones');
}

module.exports = checkUpdate;

const urlHandler = require('../lib/urlHandler');
const uploadData = require('../lib/uploadData');
const Version = require('../storage/Version');

/**
 * Проверяет сайта роспатента на наличие новых файлов 
 * Для добавления и обновления данных в коллекции
 * @param {url} Url к станице
 * @param {Model} Model монгусовская модель
 * @param {String} name имя модели
 * @param {Object} parserOptions объект Опций для парсинга
 */
async function checkUpdate(url, Model, name, parserOptions) {
  //Проверяем URL на валидность, возвращает URL ведущий к CSV
  const csvURL = await urlHandler(url);
  //Проверяем есть ли такой csvURL в базе
  const check = await Version.getLastVersion(csvURL, name);
  if (check) return console.info('URL уже лежит в базе.');
  console.info('Запись пошла.');
  //Добавляет данные из CSV в базу данных
  await uploadData(csvURL, Model, name, parserOptions);
  //Добавляет новую запись об актуальности CSV
  await Version.addNewActualUrl(csvURL, name);
  console.info('Завершено.');
}


module.exports = checkUpdate;

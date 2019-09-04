const CsvParser = require('../classes/CsvParser');
const fetch = require('node-fetch');

/**
 * Принимает на вход url с csv файлом и потоком загоняет данные в бд
 * @param {String} url урл к CSV файлу
 * @param {Object} Model монгусовская модель
 * @param {String} name имя монгусовской модели
 * @param {Object} parserOptions объект Опций для парсинга
 * @return {Promise} выводит на экран количество успешно добавленных записей и не добавленых
 */
async function uploadData(url, Model, name, parserOptions) {
  const res = await fetch(url);
  const body = await res.body;
  body.on('end', () => {
    console.info('Чтение завершено');
  });
  const parser = new CsvParser(body, Model);
  const options = await parserOptions[name] || {};
  const result = await parser.parse(options);
  console.info(`Успешно ${result.success} , не успешно ${result.fail}`);
}

module.exports = uploadData;

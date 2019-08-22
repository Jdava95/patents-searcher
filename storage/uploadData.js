const parserOptions = require('./parserOptions');
const CsvParser = require('../classes/CsvParser');
const Patent = require('./Patent');
const fetch = require('node-fetch');

async function uploadData(url) {
  const name = 'Patent'
  const res = await fetch(url);
  const body = await res.body;
  body.on('end', () => {
    console.info('Чтение завершено')
  });
  const parser = new CsvParser(body, Patent);
  const options = await parserOptions[name] || {};
  const result = await parser.parse(options);
  return `Успешно ${result.success} , не успешно ${result.fail}`;
}

module.exports = uploadData;

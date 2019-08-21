const parserOptions = require('./storage/parserOptions');
const CsvParser = require('./classes/CsvParser');
const getConfig = require('./lib/getConfig');
const Patent = require('./storage/Patent');
const fetch = require('node-fetch');
const fs = require('fs');

/**
 * Загрузить файл и распарсить
 @return {Promise}
 */

 const globalRegExp = /<\s*a[^>]*>(data-[0-9]{8}-structure-20171019.csv)<\s*\/\s*a>/g;
 const urlRegExp = /(?<=<a.*>)(.*)(?=<\/a>)/g;


async function urlHandler() {
  const response = await fetch(getConfig().ruptoUrl)
  const body = await response.text();
  const name = 'Patent';
  let foundHtmlTag = body.match(globalRegExp);
  let foundLink = foundHtmlTag[0].match(urlRegExp);
  let fileURL = `${getConfig().ruptoUrl}/${foundLink[0]}`;
  const res = await fetch(fileURL);
  const resBody = await res.body;
  resBody.on('end', () => {
    console.info('Чтение завершено')
  });
  const parser = new CsvParser(resBody, Patent);
  const options = await parserOptions[name] || {};
  const result = await parser.parse(options);
  console.info(`Успешно ${result.success} , не успешно ${result.fail}`);



}

module.exports = urlHandler;

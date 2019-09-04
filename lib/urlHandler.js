const fetch = require('node-fetch');

const globalRegExp = /<\s*a[^>]*>(data-[0-9]{8}-structure-20171019.csv)<\s*\/\s*a>/g;
const urlRegExp = /(<a.*>)(.*)(<\/a>)/;

/**
 * Возвращет csvURL для скачивания csv файла
 * @param {String} url ссылка на страницу
 * @returns {String} возвращает url на csv файл
 */
async function urlHandler(url) {
  const response = await fetch(url);
  const body = await response.text();
  const foundHtmlTag = body.match(globalRegExp);
  if (!(foundHtmlTag && foundHtmlTag.length)) return;
  const foundLink = foundHtmlTag[0].match(urlRegExp);
  return `${url}/${foundLink[2]}`;
}

module.exports = urlHandler;

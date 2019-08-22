const getConfig = require('./lib/getConfig');
const fetch = require('node-fetch');

const globalRegExp = /<\s*a[^>]*>(data-[0-9]{8}-structure-20171019.csv)<\s*\/\s*a>/g;
const urlRegExp = /(?<=<a.*>)(.*)(?=<\/a>)/g;


/**
 * @returns {String}
 */
async function urlHandler() {
  const config = getConfig();
  const response = await fetch(config.ruptoUrl)
  const body = await response.text();
  let foundHtmlTag = body.match(globalRegExp);
  if (!(foundHtmlTag && foundHtmlTag.length)) return;
  let foundLink = foundHtmlTag[0].match(urlRegExp);
  return `${config.ruptoUrl}/${foundLink}`;
}

module.exports = urlHandler;

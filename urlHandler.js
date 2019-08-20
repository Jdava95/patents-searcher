const fetch = require('node-fetch');
const fs = require('fs');
const https = require('https');
const CsvParser = require('./classes/CsvParser');
const Patent = require('./storage/Patent');

async function urlHandler() {

  var globalRegExp = /<\s*a[^>]*>(data-[0-9]{8}-structure-20171019.csv)<\s*\/\s*a>/g;
  var urlRegExp = /(?<=<a.*>)(.*)(?=<\/a>)/g;

  const response = await fetch('https://rupto.ru/opendata/7730176088-evm')
  const body = await response.text();

  let foundHtmlTag = body.match(globalRegExp);
  let foundLink = foundHtmlTag[0].match(urlRegExp);
  let url = `https://rupto.ru/opendata/7730176088-evm/${foundLink[0]}`;

  https.get(url, (res) => {

      const Model = Patent;
      const name = 'Patent';

      if (!Model) throw new Error(`Model ${name} is undefined`);
      const parser = new CsvParser(res, Model);
      const options = parserOptions[name] || {};
      const result = await parser.parse(options);
      console.log(`Успешно ${result.success} , не успешно ${result.fail}`)

    res.on('end', () => {
      console.log('done')
    })
  })
}


const fileHandler = async function (Model, { name, path }) {
  try {
    if (!Model) throw new Error(`Model ${name} is undefined`);
    const rs = fs.createReadStream(path);
    const parser = new CsvParser(rs, Model);
    const options = parserOptions[name] || {};
    const result = await parser.parse(options);
    console.log(`Успешно ${result.success} , не успешно ${result.fail}`)
  } catch (err) {
    console.error(err);
  }
}

module.exports = urlHandler;
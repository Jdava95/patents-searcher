const fs = require('fs');
const CsvParser = require('../classes/CsvParser');
const parserOptions = require('../storage/parserOptions');

const fileHandler = async function (Model, { name, path }) {
  try {
    if (!Model) throw new Error(`Model ${name} is undefined`);
    const rs = fs.createReadStream(path);
    const parser = new CsvParser(rs, Model);
    const options = parserOptions[name] || {};
    const result = await parser.parse(options);
    console.info(`Успешно ${result.success} , не успешно ${result.fail}`)
  } catch (err) {
    console.error(err);
  }
}

module.exports = fileHandler;

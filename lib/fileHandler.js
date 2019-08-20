const fs = require('fs');
const CsvParser = require('../classes/CsvParser');

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

const parserOptions = {
  Patent: {
    columns: [
      'registrationNumber',
      'registrationDate',
      'applicationNumber',
      'applicationDate',
      'authors',
      'authorsCount',
      'rightHolders',
      'contactToThirdParties',
      'programName',
      'creationYear',
      'registrationPublishDate',
      'registrationPublishNumber',
      'actual',
      'publicationURL',
    ]  ,
    options: {
        from: 2
      }
  },
};

module.exports = fileHandler;

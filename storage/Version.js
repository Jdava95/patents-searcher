const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

const VersionScheme = Schema({
  url: String,
  name: String,
  actual: Boolean
});

/**
 * @param {String} url url scv файла
 * @param {String} name имя монгусовской модели
 */
VersionScheme.static('getLastVersion', async function (url, name) {
  const response = await this.findOne({
    url: url,
    modelName: name,
    actual: true
  }).exec();
  return response;
})

/**
 * принимает url находит актуальную запись
 * делает её не актуальной
 * после чего создает новую актуальную запись
 * @param {String} url 
 */
VersionScheme.static('addNewActualUrl', async function (uri, name) {
  await this.findOneAndUpdate({
    actual: true,
    modelName: name
  }, {
    actual: false,
    modelName: name
  });
  await this.create({
    url: uri,
    modelName: name,
    actual: true
  });
})

module.exports = mongoose.model('Version', VersionScheme, 'Versions');

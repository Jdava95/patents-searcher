const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

const VersionScheme = Schema({
  url: String,
  name: String,
  actual: Boolean
},
{ 
  timestamps: true,
  versionKey: false
});

/**
 * @param {String} url url scv файла
 * @param {String} name имя монгусовской модели
 */
VersionScheme.static('getLastVersion', function getLastVersion(uri, name) {
  return this.findOne({
    url: uri,
    modelName: name,
    actual: true
  }).exec();
})

/**
 * принимает url находит актуальную запись
 * делает её не актуальной
 * после чего создает новую актуальную запись
 * @param {String} url 
 */
VersionScheme.static('addNewActualUrl', async function addNewActualUrl(uri, name) {
  await this.updateOne({
    actual: true,
    modelName: name
  }, {
    actual: false,
    modelName: name
  }).exec();

  await this.create({
    url: uri,
    modelName: name,
    actual: true
  })
});

module.exports = mongoose.model('Version', VersionScheme, 'Versions');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

const VersionScheme = Schema({
  url: String,
  actual: Boolean
});

/**
 * @param {String} url принимает url и производит поиск
 */
VersionScheme.static('getLastVersion', async function (url) {
  const response = await this.findOne({
    url: url,
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
VersionScheme.static('addNewActualUrl', async function (uri) {
  await this.findOneAndUpdate({
    actual: true
  }, {
    actual: false
  });
  await this.create({
    url: uri,
    actual: true
  });
})

module.exports = mongoose.model('Version', VersionScheme, 'Versions');

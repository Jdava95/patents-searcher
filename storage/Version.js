const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Схема версий для монгуса
 */
const VersionScheme = Schema ({
  url : {
    type: String,
    require: false,
    default: null
  },
  actual: {
    type: Boolean,
    require: false,
    default: null
  }
});
/**
 * @param {String} url принимает url и производит поиск
 */
VersionScheme.static('getLastVersion', async function (url) {
  const response = await this.findOne({url: url, actual: true}).exec();
  return response;
})

/**
 * принимает url находит актуальную запись
 * делает её не актуальной
 * после чего создает новую актуальную запись
 */
VersionScheme.static('addNewActualUrl', async function (url) {
  await this.findAndModify({actual: true}, {actual: false});
  await this.create({url: url, actual: true});
})

module.exports = mongoose.model('Version', VersionScheme, 'Versions');

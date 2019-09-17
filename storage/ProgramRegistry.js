const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const checkLimit = require('./lib/checkLimit');
const convertDate = require('./lib/convertDate');
const updateDoc = require('./lib/updateDoc');
const splitAndConvert = require('./lib/splitAndConvert');
const createFinder = require('./lib/createFinder');


/**
 * Схема патента для монгуса
 */
const ProgramRegistrySchema = Schema({
  registrationNumber: {
    type: Number,
    index: true
  },
  registrationDate: {
    type: Date,
    set: convertDate
  },
  applicationNumber: Number,
  applicationDate: {
    type: Date,
    set: convertDate
  },
  authors: {
    type: Array,
    set: splitAndConvert,
    index: true
  },
  authorsCount: Number,
  rightHolders: String,
  contactToThirdParties: String,
  programName: String,
  creationYear: Number,
  registrationPublishDate: {
    type: Date,
    set: convertDate
  },
  registrationPublishNumber: Number,
  actual: Boolean,
  publicationURL: String
},
{
  timestamps: true,
  versionKey: false
});

/**
 * Добавляет полнотекстную индексацию по авторам и названию программы
 */
ProgramRegistrySchema.index({ authors: "text", programName: "text" });

/**
 * Проверит бд на совпадение данных из потока
 * Если есть совпадения то обновит информацию
 * Если совпадений нет то перезапишет
 * @param {Object} options принимает на вход поток объектов
 * @return {Promise} result
 */
ProgramRegistrySchema.static('updateDoc', updateDoc);

/**
 * делает запрос в базу по параметру "Имя компании"
 * @param {String} name имя организации
 * @param {Number} limit лимит записей за вывод
 * @param {Number} lastId последний id за вывод
 * @return {Promise}
 */
ProgramRegistrySchema.static('getByHolders', createFinder('rightHolders'));

/**
 * делает запрос в базу по параметру "Название программы"
 * @param {String} name имя организации
 * @param {Number} limit лимит записей за вывод
 * @param {Number} lastId последний id за вывод
 * @return {Promise}
 */
ProgramRegistrySchema.static('getByProgram', createFinder('programName'));

/**
 * делает запрос в коллекцию по параметру "Авторы"
 * @param {String} name имя организации
 * @param {Number} limit лимит записей за вывод
 * @param {Number} lastId последний id за вывод
 * @return {Promise}
 */
ProgramRegistrySchema.static('getByAuthors', createFinder('authors'))

/**
 * делает запрос в коллекцию по параметру регистрационный номер
 * @param {Number} number номер регистрации
 * @return {Promise}
 */
ProgramRegistrySchema.static('getByRegNumber', async function getByRegNumber(number){
  return await this.findOne({registrationNumber : number}).exec();
})

/**
 * Позволяет получить инфрмацию по имени создателя и названию программы
 */
ProgramRegistrySchema.static('getInfo', async function getInfo(name, limit, countRec) {
  const size = checkLimit(limit);
  return await this.find( { $text: { $search: name } }, { score: { $meta: "textScore" } } )
    .sort( {score: {$meta: "textScore" } }).limit(size).skip(countRec).exec();
})

module.exports = mongoose.model('ProgramRegistry', ProgramRegistrySchema, 'ProgramRegistries');

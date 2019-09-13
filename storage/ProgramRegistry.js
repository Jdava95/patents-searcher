const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const queryValidity = require('./lib/queryValidity');
const checkLimit = require('./lib/checkLimit');
const convertDate = require('./lib/convertDate');
const updateDoc = require('./lib/updateDoc');
const splitAndConvert = require('./lib/splitAndConvert')

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
ProgramRegistrySchema.static('getByHolders', async function (name, limit, lastId) {
  const query = queryValidity('rightHolders', name, lastId);
  const size = checkLimit(limit);
  return await this.find(query).limit(size).exec();
});

/**
 * делает запрос в базу по параметру "Название программы"
 * @param {String} name имя организации
 * @param {Number} limit лимит записей за вывод
 * @param {Number} lastId последний id за вывод
 * @return {Promise} 
 */
ProgramRegistrySchema.static('getByProgram', async function (name, limit, lastId) {
  const query = queryValidity('programName', name, lastId);
  const size = checkLimit(limit);
  return await this.find(query).limit(size).exec();
})

/**
 * делает запрос в коллекцию по параметру "Авторы"
 * @param {String} name имя организации
 * @param {Number} limit лимит записей за вывод
 * @param {Number} lastId последний id за вывод
 * @return {Promise}
 */
ProgramRegistrySchema.static('getByAuthors', async function (name, limit, lastId) {
  const query = queryValidity('authors', name, lastId);
  const size = checkLimit(limit);
  return await this.find(query).limit(size).exec();
})

/**
 * делает запрос в коллекцию по параметру регистрационный номер
 * @param {Number} number номер регистрации
 * @return {Promise}
 */
ProgramRegistrySchema.static('getByRegNumber', async function(number){
  return await this.findOne({registrationNumber : number}).exec();
})

module.exports = mongoose.model('ProgramRegistry', ProgramRegistrySchema, 'ProgramRegistries');

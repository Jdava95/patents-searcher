const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const queryValidity = require('../lib/queryValidity');
const checkLimit = require('../lib/checkLimit');

/**
 * Схема патента для монгуса
 */
const ProgramRegistrySchema = Schema({
  registrationNumber: {
    type: Number,
    require: false,
    default: null
  },
  registrationDate: {
    type: Number,
    require: false,
    default: null
  },
  applicationNumber: {
    type: Number,
    require: false,
    default: null
  },
  applicationDate: {
    type: Number,
    require: false,
    default: null
  },
  authors: {
    type: String,
    require: false,
    default: null
  },
  authorsCount: {
    type: Number,
    require: false,
    default: null
  },
  rightHolders: {
    type: String,
    require: false,
    default: null
  },
  contactToThirdParties: {
    type: String,
    require: false,
    default: null
  },
  programName: {
    type: String,
    require: false,
    default: null
  },
  creationYear: {
    type: Number,
    require: false,
    default: null
  },
  registrationPublishDate: {
    type: Number,
    require: false,
    default: null
  },
  registrationPublishNumber: {
    type: Number,
    require: false,
    default: null
  },
  actual: {
    type: Boolean,
    require: false,
    default: null
  },
  publicationURL: {
    type: String,
    require: false,
    default: null
  }
});

/**
 * Проверит бд на совпадение данных из потока
 * Если есть совпадения то обновит информацию
 * Если совпадений нет то перезапишет
 * @param {Object} options принимает на вход поток объектов
 * @return {Promise} result
 */
ProgramRegistrySchema.static('updateDoc', async function (options) {
  const programRegistry = new this(options);
  const toUpdate = programRegistry.toObject();
  delete toUpdate._id;
  const result = await this.updateOne({
      registrationNumber: options.registrationNumber
    }, {
      $set: toUpdate
    }, {
      upsert: true
    })
    .exec();
  return result;
});

/**
 * делает запрос в базу по параметру "Имя компании"
 * @param {String} name имя организации
 * @param {Int} limit лимит записей за вывод
 * @param {Int} lastId последний id за вывод
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
 * @param {Int} limit лимит записей за вывод
 * @param {Int} lastId последний id за вывод
 * @return {Promise} 
 */
ProgramRegistrySchema.static('getByProgram', async function (name, limit, lastId) {
  const query = queryValidity('nameProgram', name, lastId);
  const size = checkLimit(limit);
  return await this.find(query).limit(size).exec();
})

/**
 * делает запрос в коллекцию по параметру "Авторы"
 * @param {String} name имя организации
 * @param {Int} limit лимит записей за вывод
 * @param {Int} lastId последний id за вывод
 * @return {Promise}
 */
ProgramRegistrySchema.static('getByAuthors', async function (name, limit, lastId) {
  const query = queryValidity('authors', name, lastId);
  const size = checkLimit(limit);
  return await this.find(query).limit(size).exec();
})

/**
 * делает запрос в коллекцию по параметру регистрационный номер
 * @param {Int} number номер регистрации
 * @return {Promise}
 */
ProgramRegistrySchema.static('getByRegNumber', async function(number){
  return await this.findOne({registrationNumber : number}).exec();
})

module.exports = mongoose.model('ProgramRegistry', ProgramRegistrySchema, 'ProgramRegistries');

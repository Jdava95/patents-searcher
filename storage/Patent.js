const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const queryValidity = require('./lib/queryValidity');
const checkLimit = require('./lib/checkLimit');
const convertDate = require('./lib/convertDate');
const updateDoc = require('./lib/updateDoc');
const splitAndConvertDate = require('./lib/splitAndConvertDate')

const PatentSchema = Schema({
  registrationNumber: {
    type: Number,
    index: true
  },
  registrationDate: {
    type: Date,
    set: convertDate
  },
  applicationNumber: String,
  applicationDate: {
    type: Date,
    set: convertDate
  },
  authors: {
    type: String,
    index: true
  },
  authorsLatin: String,
  patentHolders: String,
  patentHoldersLatin: String,
  correspondenceAddress: String,
  correspondenceAddressLatin: String,
  inventionName: {
    type: String,
    index: true
  },
  patentStartingDate: {
    type: Date,
    set: convertDate
  },
  crimeanInventionApplicationNumberStateRegistrationUkraine: Number,
  crimeanInventionApplicationDateStateRegistrationUkraine: Number,
  crimeanInventionPatentNumberUkraine: Number,
  receiptDateAdditionalDataApplication: Number,
  dateApplicationWhichAdditionalDataHasBeenReceived: Number,
  numberApplicationWhichAdditionalDataHasBeenReceived: Number,
  initialApplicationNumber: Number,
  initialApplicationDate: Number,
  initialApplicationPriorityDate: Number,
  previousApplicationNumber: String,
  previousApplicationDate: Number,
  parisConventionPriorityNumber: String,
  parisConventionPriorityDate: {
    type: Array,
    set: splitAndConvertDate
  },
  parisConventionPriorityCountryCode: String,
  pctApplicationExaminationStartDate: Number,
  pctApplicationNumber: String,
  pctApplicationDate: Number,
  pctApplicationPublishNumber: Number,
  pctApplicationPublishDate: Number,
  eaApplicationNumber: Number,
  eaApplicationDate: Number,
  eaApplicationPublishNumber: Number,
  eaApplicationPublishDate: Number,
  applicationPublishDate: Number,
  applicationPublishNumber: Number,
  patentGrantPublishDate: {
    type: Date,
    set: convertDate
  },
  patentGrantPublishNumber: Number,
  revokedPatentNumber: Number,
  informationAboutObligationConcludeContractAlienation: String,
  expirationDate: Number,
  inventionFormulaNumbersWhichPatentTermProlonged: String,
  additionalPatent: Boolean,
  actual: Boolean,
  publicationURL: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

/**
 * Проверит бд на совпадение данных из потока
 * Если есть совпадения то обновит информацию
 * Если совпадений нет то перезапишет
 * @param {Object} options принимает на вход поток объектов
 * @return {Promise} result
 */
PatentSchema.static('updateDoc', updateDoc);

/**
 * делает запрос в базу по параметру "Номер регистрации"
 * @param {Number} number номер регистрации
 * @param {Number} limit лимит записей за вывод
 * @param {Number} lastId последний id за вывод
 * @return {Promise}
 */
PatentSchema.static('getByRegNumber', async function getByRegNumber(number) {
  return await this.findOne({
    registrationNumber: number
  }).exec();
});

/**
 * делает запрос в базу по параметру "Авторы"
 * @param {String} name имя организации
 * @param {Int} limit лимит записей за вывод
 * @param {Int} lastId последний id за вывод
 * @return {Promise} 
 */
PatentSchema.static('getByAuthors', async function getByAuthors(name, limit, lastId) {
  const query = queryValidity('authors', name, lastId);
  const size = checkLimit(limit);
  return await this.find(query).limit(size).exec();
})

/**
 * делает запрос в коллекцию по параметру "Название работы"
 * @param {String} name имя организации
 * @param {Number} limit лимит записей за вывод
 * @param {Number} lastId последний id за вывод
 * @return {Promise}
 */
PatentSchema.static('getByInventionName', async function getByInventionName(name, limit, lastId) {
  const query = queryValidity('inventionName', name, lastId);
  const size = checkLimit(limit);
  return await this.find(query).limit(size).exec();
})

module.exports = mongoose.model('Patent', PatentSchema, 'Patents');
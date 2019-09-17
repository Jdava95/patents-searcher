const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const checkLimit = require('./lib/checkLimit');
const convertDate = require('./lib/convertDate');
const updateDoc = require('./lib/updateDoc');
const splitAndConvert = require('./lib/splitAndConvert');
const createFinder = require('./lib/createFinder');

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
    type: Array,
    set: splitAndConvert,
    index: true
  },
  authorsLatin: String,
  patentHolders: String,
  patentHoldersLatin: String,
  correspondenceAddress: String,
  correspondenceAddressLatin: String,
  inventionName: String,
  patentStartingDate: {
    type: Date,
    set: convertDate
  },
  crimeanInventionApplicationNumberStateRegistrationUkraine: String,
  crimeanInventionApplicationDateStateRegistrationUkraine: Number,
  crimeanInventionPatentNumberUkraine: Number,
  receiptDateAdditionalDataApplication: Number,
  dateApplicationWhichAdditionalDataHasBeenReceived: Number,
  numberApplicationWhichAdditionalDataHasBeenReceived: Number,
  initialApplicationNumber: String,
  initialApplicationDate: Number,
  initialApplicationPriorityDate: Number,
  previousApplicationNumber: String,
  previousApplicationDate: {
    type: Array,
    set: splitAndConvert
  },
  parisConventionPriorityNumber: String,
  parisConventionPriorityDate: {
    type: Array,
    set: splitAndConvert
  },
  parisConventionPriorityCountryCode: String,
  pctApplicationExaminationStartDate: Number,
  pctApplicationNumber: String,
  pctApplicationDate: Number,
  pctApplicationPublishNumber: String,
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
  publicationURL: String
},
{
  timestamps: true,
  versionKey: false
});
/**
 * Добавляет полнотекстную индексацию по авторам и названиям изобретений
 */
PatentSchema.index({ authors: "text", inventionName: "text"});

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
  return await this.findOne({registrationNumber: number}).exec();
});

/**
 * делает запрос в базу по параметру "Авторы"
 * @param {String} name имя организации
 * @param {Number} limit лимит записей за вывод
 * @param {Number} lastId последний id за вывод
 * @return {Promise}
 */
PatentSchema.static('getByAuthors', createFinder('authors'))

/**
 * делает запрос в коллекцию по параметру "Название работы"
 * @param {String} name имя организации
 * @param {Number} limit лимит записей за вывод
 * @param {Number} lastId последний id за вывод
 * @return {Promise}
 */
PatentSchema.static('getByInventionName', createFinder('inventionName'));


PatentSchema.static('getInfo', async function getInfo(name, limit, countRec) {
  const size = checkLimit(limit);
  return await this.find( { $text: { $search: name } }, { score: { $meta: "textScore" } } )
  .sort( {score: {$meta: "textScore" } }).limit(size).skip(countRec).exec();

})

module.exports = mongoose.model('Patent', PatentSchema, 'Patents');

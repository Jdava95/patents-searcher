const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const queryValidity = require('../lib/queryValidity');
const checkLimit = require('../lib/checkLimit');
const convertDate = require('../lib/convertDate');

const PatentSchema = Schema({
  registrationNumber: Number,
  registrationDate: {
    type: Date,
    set: convertDate
  },
  applicationNumber: Number,
  applicationDate: {
    type: Date,
    set: convertDate
  },
  authors: String,
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
  crimeanInventionApplicationNumberStateRegistrationUkraine: Number,
  crimeanInventionApplicationDateStateRegistrationUkraine: Number,
  crimeanInventionPatentNumberUkraine: Number,
  receiptDateAdditionalDataApplication: Number,
  dateApplicationWhichAdditionalDataHasBeenReceived: Number,
  numberApplicationWhichAdditionalDataHasBeenReceived: Number,
  initialApplicationNumber: Number,
  initialApplicationDate: Number,
  initialApplicationPriorityDate: Number,
  previousApplicationNumber: Number,
  previousApplicationDate: Number,
  parisConventionPriorityNumber: Number,
  parisConventionPriorityDate: Number,
  parisConventionPriorityCountryCode: String,
  pctApplicationExaminationStartDate: Number,
  pctApplicationNumber: Number,
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

PatentSchema.static('updateDoc', async function updateDoc(options) {
  const Patent = new this(options);
  const toUpdate = Patent.toObject();
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
 * делает запрос в базу по параметру "Номер регистрации"
 * @param {Int} number номер регистрации
 * @param {Int} limit лимит записей за вывод
 * @param {Int} lastId последний id за вывод
 * @return {Promise}
 */
PatentSchema.static('getByRegNumber', async function getByRegNumber(number) {
  return await this.findOne({registrationNumber: number}).exec();
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
 * @param {Int} limit лимит записей за вывод
 * @param {Int} lastId последний id за вывод
 * @return {Promise}
 */
PatentSchema.static('getByInventionName', async function getByInventionName(name, limit, lastId) {
  const query = queryValidity('inventionName', name, lastId);
  const size = checkLimit(limit);
  return await this.find(query).limit(size).exec();
})

module.exports = mongoose.model('Patent', PatentSchema, 'Patents');
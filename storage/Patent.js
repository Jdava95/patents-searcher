const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const queryValidity = require('../lib/queryValidity');
const checkLimit = require('../lib/checkLimit');

const PatentSchema = Schema({
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
  authorsLatin: {
    type: String,
    require: false,
    default: null
  },
  patentHolders: {
    type: String,
    require: false,
    default: null
  },
  patentHoldersLatin: {
    type: String,
    require: false,
    default: null
  },
  correspondenceAddress: {
    type: String,
    require: false,
    default: null
  },
  correspondenceAddressLatin: {
    type: String,
    require: false,
    default: null
  },
  inventionName: {
    type: String,
    require: false,
    default: null
  },
  patentStartingDate: {
    type: Number,
    require: false,
    default: null
  },
  crimeanInventionApplicationNumberStateRegistrationUkraine: {
    type: Number,
    require: false,
    default: null
  },
  crimeanInventionApplicationDateStateRegistrationUkraine: {
    type: Number,
    require: false,
    default: null
  },
  crimeanInventionPatentNumberUkraine: {
    type: Number,
    require: false,
    default: null
  },
  receiptDateAdditionalDataApplication: {
    type: Number,
    require: false,
    default: null
  },
  dateApplicationWhichAdditionalDataHasBeenReceived: {
    type: Number,
    require: false,
    default: null
  },
  numberApplicationWhichAdditionalDataHasBeenReceived: {
    type: Number,
    require: false,
    default: null
  },
  initialApplicationNumber: {
    type: Number,
    require: false,
    default: null
  },
  initialApplicationDate: {
    type: Number,
    require: false,
    default: null
  },
  initialApplicationPriorityDate: {
    type: Number,
    require: false,
    default: null
  },
  previousApplicationNumber: {
    type: Number,
    require: false,
    default: null
  },
  previousApplicationDate: {
    type: Number,
    require: false,
    default: null
  },
  parisConventionPriorityNumber: {
    type: Number,
    require: false,
    default: null
  },
  parisConventionPriorityDate: {
    type: Number,
    require: false,
    default: null
  },
  parisConventionPriorityCountryCode: {
    type: String,
    require: false,
    default: null
  },
  PCTApplicationExaminationStartDate: {
    type: Number,
    require: false,
    default: null
  },
  PCTApplicationNumber: {
    type: Number,
    require: false,
    default: null
  },
  PCTApplicationDate: {
    type: Number,
    require: false,
    default: null
  },
  PCTApplicationPublishNumber: {
    type: Number,
    require: false,
    default: null
  },
  PCTApplicationPublishDate: {
    type: Number,
    require: false,
    default: null
  },
  EAApplicationNumber: {
    type: Number,
    require: false,
    default: null
  },
  EAApplicationDate: {
    type: Number,
    require: false,
    default: null
  },
  EAApplicationPublishNumber: {
    type: Number,
    require: false,
    default: null
  },
  EAApplicationPublishDate: {
    type: Number,
    require: false,
    default: null
  },
  applicationPublishDate: {
    type: Number,
    require: false,
    default: null
  },
  applicationPublishNumber: {
    type: Number,
    require: false,
    default: null
  },
  patentGrantPublishDate: {
    type: Number,
    require: false,
    default: null
  },
  patentGrantPublishNumber: {
    type: Number,
    require: false,
    default: null
  },
  revokedPatentNumber: {
    type: Number,
    require: false,
    default: null
  },
  informationAboutObligationConcludeContractAlienation: {
    type: String,
    require: false,
    default: null
  },
  expirationDate: {
    type: Number,
    require: false,
    default: null
  },
  inventionFormulaNumbersWhichPatentTermProlonged: {
    type: String,
    require: false,
    default: null
  },
  additionalPatent: {
    type: Boolean,
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
})

PatentSchema.static('updateDoc', async function (options) {
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
PatentSchema.static('getByRegNumber', async function (number) {
  return await this.findOne({registrationNumber: number}).exec();
});

/**
 * делает запрос в базу по параметру "Авторы"
 * @param {String} name имя организации
 * @param {Int} limit лимит записей за вывод
 * @param {Int} lastId последний id за вывод
 * @return {Promise} 
 */
PatentSchema.static('getByAuthors', async function (name, limit, lastId) {
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
PatentSchema.static('getByInventionName', async function (name, limit, lastId) {
  const query = queryValidity('inventionName', name, lastId);
  const size = checkLimit(limit);
  return await this.find(query).limit(size).exec();
})

module.exports = mongoose.model('Patent', PatentSchema, 'Patents');
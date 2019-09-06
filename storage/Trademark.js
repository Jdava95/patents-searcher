const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const queryValidity = require('../lib/queryValidity');
const checkLimit = require('../lib/checkLimit');
const convertDate = require('../lib/convertDate');

const TrademarkSchema = Schema({
  registrationNumber  :String,
  registrationDate : {
    type: Date,
    set: convertDate
  },
  applicationNumber :Number,
  applicationDate : {
    type: Date,
    set: convertDate
  },
  priorityDate : {
    type: Date,
    set: convertDate
  },
  exhibitionPriorityDate :Number,
  parisConventionPriorityNumber :String,
  parisConventionPriorityDate :Number,
  parisConventionPriorityCountryCode :String,
  initialApplicationNumber :Number,
  initialApplicationPriorityDate :Number,
  initialRegistrationNumber :Number,
  initialRegistrationDate :Number,
  internationalRegistrationNumber :Number,
  internationalRegistrationDate :Number,
  internationalRegistrationPriorityDate :Number,
  internationalRegistrationEntryDate :Number,
  applicationNumberRecognitionTrademarkFromCrimea :String,
  applicationDateRecognitionTrademarkFromCrimea :Number,
  crimeanTrademarkApplicationNumberStateRegistrationUkraine :String,
  crimeanTrademarkApplicationDateStateRegistrationUkraine :Number,
  crimeanTrademarkCertificateNumberUkraine :String,
  exclusiveRightsTransferAgreementRegistrationNumber :Number,
  exclusiveRightsTransferAgreementRegistrationDate :Number,
  legallyRelatedApplications :String,
  legallyRelatedRegistrations :String,
  expirationDate : {
    type: Date,
    set: convertDate
  },
  rightHolderName  :String,
  foreignRightHolderName  :String,
  rightHolderAddress  :String,
  rightHolderCountryCode :String,
  rightHolderOgrn :Number,
  rightHolderInn :Number,
  correspondenceAddress :String,
  collective :Boolean,
  collectiveUsers :String,
  extractionFromCharterCollectiveTrademark :String,
  colorSpecification :String,
  unprotectedElements :String,
  kindSpecification :String,
  threedimensional :Boolean,
  threedimensionalSpecification :String,
  holographic :Boolean,
  holographicSpecification :String,
  sound :Boolean,
  soundSpecification :String,
  olfactory :Boolean,
  olfactorySpecification :String,
  color :Boolean,
  colorTrademarkSpecification :String,
  light :Boolean,
  lightSpecification :String,
  changing :Boolean,
  changingSpecification :String,
  positional :Boolean,
  positionalSpecification :String,
  actual :Boolean,
  publicationURL :String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})


TrademarkSchema.static('updateDoc', async function (options) {
  const Trademark = new this(options);
  const toUpdate = Trademark.toObject();
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
 * Поиск по регистрационному номеру
 * @param {String} number регистрационный номер
 * @return {Promise}
 */
TrademarkSchema.static('getByRegNumber', async function(number) {
  return await this.findOne({ registrationNumber: number}).exec();
})

/**
 * делает запрос в базу по параметру владелец компании
 * @param {String} name имя организации
 * @param {Int} limit лимит записей за вывод
 * @param {Int} lastId последний id за вывод
 * @return {Promise}
 */
TrademarkSchema.static('getByRightHolders', async function (name, limit, lastId) {
  const query = queryValidity('rightHolderName', name, lastId);
  const size = checkLimit(limit);
  return await this.find(query).limit(size).exec();
});

module.exports = mongoose.model('Trademark', TrademarkSchema, 'Trademarks');

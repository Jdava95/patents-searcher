const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const queryValidity = require('../lib/queryValidity');
const checkLimit = require('../lib/checkLimit');

const TrademarkSchema = Schema({
  registrationNumber  : {
    type: String,
    require: false,
    default: null
  },
  registrationDate : {
    type: Number,
    require: false,
    default: null
  },
  applicationNumber : {
    type: Number,
    require: false,
    default: null
  },
  applicationDate : {
    type: Number,
    require: false,
    default: null
  },
  priorityDate : {
    type: Number,
    require: false,
    default: null
  },
  exhibitionPriorityDate : {
    type: Number,
    require: false,
    default: null
  },
  parisConventionPriorityNumber : {
    type: String,
    require: false,
    default: null
  },
  parisConventionPriorityDate : {
    type: Number,
    require: false,
    default: null
  },
  parisConventionPriorityCountryCode : {
    type: String,
    require: false,
    default: null
  },
  initialApplicationNumber : {
    type: Number,
    require: false,
    default: null
  },
  initialApplicationPriorityDate : {
    type: Number,
    require: false,
    default: null
  },
  initialRegistrationNumber : {
    type: Number,
    require: false,
    default: null
  },
  initialRegistrationDate : {
    type: Number,
    require: false,
    default: null
  },
  internationalRegistrationNumber : {
    type: Number,
    require: false,
    default: null
  },
  internationalRegistrationDate : {
    type: Number,
    require: false,
    default: null
  },
  internationalRegistrationPriorityDate : {
    type: Number,
    require: false,
    default: null
  },
  internationalRegistrationEntryDate : {
    type: Number,
    require: false,
    default: null
  },
  applicationNumberRecognitionTrademarkFromCrimea : {
    type: String,
    require: false,
    default: null
  },
  applicationDateRecognitionTrademarkFromCrimea : {
    type: Number,
    require: false,
    default: null
  },
  CrimeanTrademarkApplicationNumberStateRegistrationUkraine : {
    type: String,
    require: false,
    default: null
  },
  CrimeanTrademarkApplicationDateStateRegistrationUkraine : {
    type: Number,
    require: false,
    default: null
  },
  CrimeanTrademarkCertificateNumberUkraine : {
    type: String,
    require: false,
    default: null
  },
  exclusiveRightsTransferAgreementRegistrationNumber : {
    type: Number,
    require: false,
    default: null
  },
  exclusiveRightsTransferAgreementRegistrationDate : {
    type: Number,
    require: false,
    default: null
  },
  legallyRelatedApplications : {
    type: String,
    require: false,
    default: null
  },
  legallyRelatedRegistrations : {
    type: String,
    require: false,
    default: null
  },
  expirationDate : {
    type: Number,
    require: false,
    default: null
  },
  rightHolderName  : {
    type: String,
    require: false,
    default: null
  },
  foreignRightHolderName  : {
    type: String,
    require: false,
    default: null
  },
  rightHolderAddress  : {
    type: String,
    require: false,
    default: null
  },
  rightHolderCountryCode : {
    type: String,
    require: false,
    default: null
  },
  rightHolderOgrn : {
    type: Number,
    require: false,
    default: null
  },
  rightHolderInn : {
    type: Number,
    require: false,
    default: null
  },
  correspondenceAddress : {
    type: String,
    require: false,
    default: null
  },
  collective : {
    type: Boolean,
    require: false,
    default: null
  },
  collectiveUsers : {
    type: String,
    require: false,
    default: null
  },
  extractionFromCharterCollectiveTrademark : {
    type: String,
    require: false,
    default: null
  },
  colorSpecification : {
    type: String,
    require: false,
    default: null
  },
  unprotectedElements : {
    type: String,
    require: false,
    default: null
  },
  kindSpecification : {
    type: String,
    require: false,
    default: null
  },
  threedimensional : {
    type: Boolean,
    require: false,
    default: null
  },
  threedimensionalSpecification : {
    type: String,
    require: false,
    default: null
  },
  holographic : {
    type: Boolean,
    require: false,
    default: null
  },
  holographicSpecification : {
    type: String,
    require: false,
    default: null
  },
  sound : {
    type: Boolean,
    require: false,
    default: null
  },
  soundSpecification : {
    type: String,
    require: false,
    default: null
  },
  olfactory : {
    type: Boolean,
    require: false,
    default: null
  },
  olfactorySpecification : {
    type: String,
    require: false,
    default: null
  },
  color : {
    type: Boolean,
    require: false,
    default: null
  },
  colorTrademarkSpecification : {
    type: String,
    require: false,
    default: null
  },
  light : {
    type: Boolean,
    require: false,
    default: null
  },
  lightSpecification : {
    type: String,
    require: false,
    default: null
  },
  changing : {
    type: Boolean,
    require: false,
    default: null
  },
  changingSpecification : {
    type: String,
    require: false,
    default: null
  },
  positional : {
    type: Boolean,
    require: false,
    default: null
  },
  positionalSpecification : {
    type: String,
    require: false,
    default: null
  },
  actual : {
    type: Boolean,
    require: false,
    default: null
  },
  publicationURL : {
    type: String,
    require: false,
    default: null
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
 * делает запрос в базу по параметру "Имя компании"
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

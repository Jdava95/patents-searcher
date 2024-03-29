const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const convertDate = require('./lib/convertDate');
const updateDoc = require('./lib/updateDoc');
const createFinder = require('./lib/createFinder');
const regNumSearcher = require('./lib/regNumSearcher');

const TrademarkSchema = Schema({
  registrationNumber : {
    type: String,
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
  priorityDate: {
    type: Date,
    set: convertDate
  },
  exhibitionPriorityDate: Number,
  parisConventionPriorityNumber: String,
  parisConventionPriorityDate: Number,
  parisConventionPriorityCountryCode: String,
  initialApplicationNumber: Number,
  initialApplicationPriorityDate: Number,
  initialRegistrationNumber: Number,
  initialRegistrationDate: Number,
  internationalRegistrationNumber: Number,
  internationalRegistrationDate: Number,
  internationalRegistrationPriorityDate: Number,
  internationalRegistrationEntryDate: Number,
  applicationNumberRecognitionTrademarkFromCrimea: String,
  applicationDateRecognitionTrademarkFromCrimea: Number,
  crimeanTrademarkApplicationNumberStateRegistrationUkraine: String,
  crimeanTrademarkApplicationDateStateRegistrationUkraine: Number,
  crimeanTrademarkCertificateNumberUkraine: String,
  exclusiveRightsTransferAgreementRegistrationNumber: String,
  exclusiveRightsTransferAgreementRegistrationDate: Number,
  legallyRelatedApplications: String,
  legallyRelatedRegistrations: String,
  expirationDate: {
    type: Date,
    set: convertDate
  },
  rightHolderName: {
    type: String,
    index: true
  },
  foreignRightHolderName: String,
  rightHolderAddress: String,
  rightHolderCountryCode: String,
  rightHolderOgrn: String,
  rightHolderInn: Number,
  correspondenceAddress: String,
  collective: Boolean,
  collectiveUsers: String,
  extractionFromCharterCollectiveTrademark: String,
  colorSpecification: String,
  unprotectedElements: String,
  kindSpecification: String,
  threedimensional: Boolean,
  threedimensionalSpecification: String,
  holographic: Boolean,
  holographicSpecification: String,
  sound: Boolean,
  soundSpecification: String,
  olfactory: Boolean,
  olfactorySpecification: String,
  color: Boolean,
  colorTrademarkSpecification: String,
  light: Boolean,
  lightSpecification: String,
  changing: Boolean,
  changingSpecification: String,
  positional: Boolean,
  positionalSpecification: String,
  actual: Boolean,
  publicationURL: String
},
{ 
  timestamps: true,
  versionKey: false
})

/**
 * Проверит бд на совпадение данных из потока
 * Если есть совпадения то обновит информацию
 * Если совпадений нет то перезапишет
 */
TrademarkSchema.static('updateDoc', updateDoc);

/**
 * Поиск по регистрационному номеру
 */
TrademarkSchema.static('getByRegNumber', regNumSearcher)

/**
 * делает запрос в базу по параметру владелец компании
 */
TrademarkSchema.static('getByRightHolders', createFinder('rightHolderName'));

module.exports = mongoose.model('Trademark', TrademarkSchema, 'Trademarks');

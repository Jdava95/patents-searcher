const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const convertDate = require('./lib/convertDate');
const updateDoc = require('./lib/updateDoc');
const splitAndConvert = require('./lib/splitAndConvert');
const createFinder = require('./lib/createFinder');
const fullTextSearcher = require('./lib/fullTextSearcher');
const regNumSearcher = require('./lib/regNumSearcher');

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
ProgramRegistrySchema.index({ authors: 'text', programName: 'text' });

/**
 * Проверит бд на совпадение данных из потока
 * Если есть совпадения то обновит информацию
 * Если совпадений нет то перезапишет
 */
ProgramRegistrySchema.static('updateDoc', updateDoc);

/**
 * делает запрос в базу по параметру "Имя компании"
 */
ProgramRegistrySchema.static('getByHolders', createFinder('rightHolders'));

/**
 * делает запрос в базу по параметру "Название программы"
 */
ProgramRegistrySchema.static('getByProgram', createFinder('programName'));

/**
 * делает запрос в коллекцию по параметру "Авторы"
 */
ProgramRegistrySchema.static('getByAuthors', createFinder('authors'));

/**
 * делает запрос в коллекцию по параметру регистрационный номер
 */
ProgramRegistrySchema.static('getByRegNumber', regNumSearcher);

/**
 * Позволяет получить инфрмацию по имени создателя и названию программы
 */
ProgramRegistrySchema.static('getInfo', fullTextSearcher);

module.exports = mongoose.model('ProgramRegistry', ProgramRegistrySchema, 'ProgramRegistries');

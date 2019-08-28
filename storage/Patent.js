const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Limit = {
  MIN: 1,
  DEFAULT: 10,
  MAX: 20
}

/**
 * Схема патента для монгуса
 */
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
 * Проверяет на валидность входные параметры
 * И возвращает query соответствующему методу
 * @param {String} method 
 * @param {String} name 
 * @param {String} lastId 
 * @return {Object} query
 */
function queryValidity (method, name, lastId) {
  const regex = new RegExp(name, 'i');
  let query = {};

  switch (method) {
    case 'findByNameHolders':
      query = {
        rightHolders: regex
      }
      break;
    case 'findByAuthors':
      query = {
        authors: regex
      }
      break;
    case 'findByNameProgram':
      query = {
        programName: regex
      }
      break;
    default:
      break;
  }

  if (lastId && isValid(lastId)) {
    query._id = {
      $gt: mongoose.Types.ObjectId(lastId)
    };
  }

  return query;
}

/**
 * Проверяет входное число на соответствия требованиям
 * @param {Int} limit 
 * @return {Int} limit
 */
function checkLimit (limit) {
  if (!limit || !parseInt(limit, 10)) {
    limit = Limit.DEFAULT;
  } else if (parseInt(limit, 10) < Limit.MIN) {
    limit = Limit.MIN;
  } else if (parseInt(limit, 10) > Limit.MAX) {
    limit = Limit.MAX;
  }

  return limit;
}

/**
 * Проверит входной параметр на валидность id
 * Возвращает true если входной параметр является id
 * или false соответственно
 * @param {ObjectId} id 
 * @return {Boolean} boolean 
 */
function isValid(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

/**
 * Проверит бд на совпадение данных из потока
 * Если есть совпадения то обновит информацию
 * Если совпадений нет то перезапишет
 * @param {Object} options принимает на вход поток объектов
 * @return {Promise} result
 */
PatentSchema.static('updateDoc', async function (options) {
  const patent = new this(options);
  const toUpdate = patent.toObject();
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
PatentSchema.static('findByNameHolders', async function (name, limit, lastId) {
  const query = queryValidity('findByNameHolders', name, lastId);
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
PatentSchema.static('findByNameProgram', async function (name, limit, lastId) {
  const query = queryValidity('findByNameProgram', name, lastId);
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
PatentSchema.static('findByAuthors', async function (name, limit, lastId) {
  const query = queryValidity('findByAuthors', name, lastId);
  const size = checkLimit(limit);
  return await this.find(query).limit(size).exec();
})

module.exports = mongoose.model('Patent', PatentSchema, 'Patents');

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
 * Проверит бд на совпадение данных из потока
 * Если есть совпадения то обновит информацию
 * Если совпадений нет то перезапишет
 * 
 * @param {options} принимает на вход поток объектов
 * @return {result} возвращает промис 
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
 * делает запрос в базу по параметру "Имя компании"
 * @param {String} name имя организации
 * @param {Int} limit лимит записей за вывод
 * @param {Int} lastId последний id за вывод
 * @returns {JSON} response отдает json 
 */
PatentSchema.static('findByNameHolders', async function (name, limit, lastId) {
  const regex = new RegExp(name, 'i');
  let query = {
    rightHolders: regex
  }
  if (lastId && isValid(lastId)) {
    query._id = {
      $gt: mongoose.Types.ObjectId(lastId)
    };
  }
  if (!limit || limit <= Limit.MIN) {
    limit = Limit.DEFAULT;
  } else if (limit > Limit.MAX) {
    limit = Limit.MAX;
  } else if (!parseInt(limit)) {
    limit = Limit.DEFAULT;
  }
  const response = await this.find(query).limit(limit).exec();
  return response;
});

/**
 * делает запрос в базу по параметру "Название программы"
 * @param {String} name имя организации
 * @param {Int} limit лимит записей за вывод
 * @param {Int} lastId последний id за вывод
 * @returns {JSON} response отдает json 
 */
PatentSchema.static('findByNameProgram', async function (name, limit, lastId) {
  const regex = new RegExp(name, 'i');
  let query = {
    programName: regex
  }
  if (lastId && isValid(lastId)) {
    query._id = {
      $gt: mongoose.Types.ObjectId(lastId)
    };
  }
  if (!limit || limit <= Limit.MIN) {
    limit = Limit.DEFAULT;
  } else if (limit > Limit.MAX) {
    limit = Limit.MAX;
  } else if (!parseInt(limit)) {
    limit = Limit.DEFAULT;
  }
  const response = await this.find(query).limit(limit).exec();
  return response;
})

/**
 * делает запрос в коллекцию по параметру "Авторы"
 * @param {String} name имя организации
 * @param {Int} limit лимит записей за вывод
 * @param {Int} lastId последний id за вывод
 * @returns {JSON} response отдает json 
 */
PatentSchema.static('findByAuthors', async function (name, limit, lastId) {
  const regex = new RegExp(name, 'i');
  let query = {
    authors: regex
  }
  if (lastId && isValid(lastId)) {
    query._id = {
      $gt: mongoose.Types.ObjectId(lastId)
    };
  }
  if (!limit || limit <= Limit.MIN) {
    limit = Limit.DEFAULT;
  } else if (limit > Limit.MAX) {
    limit = Limit.MAX;
  } else if (!parseInt(limit)) {
    limit = Limit.DEFAULT;
  }
  const response = await this.find(query).limit(limit).exec();
  return response;
})

module.exports = mongoose.model('Patent', PatentSchema, 'Patents');
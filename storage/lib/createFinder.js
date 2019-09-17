const queryValidity = require('./queryValidity');
const checkLimit = require('./checkLimit');

/**
 * 
 * @param {fieldName} fieldName название поля в коллекции
 * @returns {funtion} 
 */
function createFinder(fieldName) {
  /**
  * @param {String} name имя организации
  * @param {Number} limit лимит записей за вывод
  * @param {Number} lastId последний id за вывод
  * @returns {Promise}
   */
  return function (name, limit, lastId) {
    const query = queryValidity(fieldName, name, lastId);
    const size = checkLimit(limit);
    return this.find(query).limit(size).exec();
  }
}

module.exports = createFinder;

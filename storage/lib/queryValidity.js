const mongoose = require('mongoose');
/**
 * Проверяет на валидность входные параметры
 * И возвращает query соответствующему методу
 * @param {String} method 
 * @param {String} name 
 * @param {String} lastId 
 * @return {Object} query возвращает объект для запроса
 */
function queryValidity (method, name, lastId) {
  const regex = new RegExp(name, 'i');
  let query = { [method]: regex };

  if (lastId && mongoose.Types.ObjectId.isValid(lastId)) {
    query._id = {
      $gt: mongoose.Types.ObjectId(lastId)
    };
  }
  return query;
}

module.exports = queryValidity;

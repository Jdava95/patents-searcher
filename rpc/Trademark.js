const Trademark = require('../storage/Trademark');

module.exports = {
  /**
   * Поиск по регистрационному номеру
   * @param {Object} obj 
   * @returns {Promise}
   */
  getByRightHolders(obj) {
    return Trademark.getByRightHolders(obj.name , obj.limit, obj.lastId);
  },

  /**
   * Поиск по названию компании
   * @param {Object} obj 
   * @returns {Promise}
   */
  getByRegNumber(obj) {
    return Trademark.getByRegNumber(obj.number);
  }
}

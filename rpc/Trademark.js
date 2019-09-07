const Trademark = require('../storage/Trademark');

module.exports = {
  /**
   * Поиск по регистрационному номеру
   * @param {Object} obj 
 * @returns {Promise}
   */
  async getByRightHolders(obj) {
    return await Trademark.getByRightHolders(obj.name , obj.limit, obj.lastId);
  },

/**
 * Поиск по названию компании
 * @param {Object} obj 
 * @returns {Promise}
 */
  async getByRegNumber(obj) {
    return await Trademark.getByRegNumber(obj.number)
  }
}
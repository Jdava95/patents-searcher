const Patent = require('../storage/Patent');

module.exports = {

  /**
   * поиск по регистрационному номеру
   * @param {Object} obj 
   * @returns {Promise}
   */
  async getByRegNumber (obj) {
    return await Patent.getByRegNumber(obj.number);
  },

  /**
   * поиск по названию метода программы
   * @param {Object} obj 
   * @returns {Promise}
   */
  async getByInventionName (obj) {
    return await Patent.getByInventionName(obj.name, obj.limit, obj.lastId);
  },

  /**
   * поиск по авторам
   * @param {Object} obj 
   * @returns {Promise}
   */
  async getByAuthors (obj) {
    return await Patent.getByAuthors(obj.name, obj.limit, obj.lastId);
  },

  async getInfo(obj) {
    return await Patent.getInfo(obj.name, obj.limit, obj.countRec);
  }
}

const Patent = require('../storage/Patent');

module.exports = {
  /**
   * поиск по регистрационному номеру
   * @param {Object} obj 
   * @returns {Promise}
   */
  getByRegNumber (obj) {
    return Patent.getByRegNumber(obj.number);
  },

  /**
   * поиск по названию метода программы
   * @param {Object} obj 
   * @returns {Promise}
   */
  getByInventionName (obj) {
    return Patent.getByInventionName(obj.name, obj.limit, obj.lastId);
  },

  /**
   * поиск по авторам
   * @param {Object} obj 
   * @returns {Promise}
   */
  getByAuthors (obj) {
    return Patent.getByAuthors(obj.name, obj.limit, obj.lastId);
  },

  /**
   * поиск по параметрам автор и нащвание программы
   * как вместе так и отдельно  
   * @param {Object} obj 
   * @returns {Promise}
   */
  getInfo(obj) {
    return Patent.getInfo(obj.name, obj.limit, obj.countRec);
  }
}

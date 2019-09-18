const ProgramRegistry = require('../storage/ProgramRegistry');

module.exports = {
  /**
   * поиск по названию компании
   * @param {Object} obj 
   * @returns {Promise}
   */
  getByHolders (obj) {
    return ProgramRegistry.getByHolders(obj.name, obj.limit, obj.lastId);
  },

  /**
   * поиск по названию программы
   * @param {Object} obj 
   * @returns {Promise}
   */
  getByProgram (obj) {
    return ProgramRegistry.getByProgram(obj.name, obj.limit, obj.lastId);
  },

  /**
   * поиск по авторам программы
   * @param {Object} obj 
   * @returns {Promise}
   */
  getByAuthors (obj) {
    return ProgramRegistry.getByAuthors(obj.name, obj.limit, obj.lastId);
  },

    /**
   * поиск по номеру регистрации программы
   * @param {Object} obj 
   * @returns {Promise}
   */
  getByRegNumber(obj) {
    return ProgramRegistry.getByRegNumber(obj.number);
  },

    /**
   * поиск по авторам и названию программы
   * @param {Object} obj 
   * @returns {Promise}
   */
  getInfo(obj) {
    return ProgramRegistry.getInfo(obj.name, obj.limit, obj.countRec);
  }
}

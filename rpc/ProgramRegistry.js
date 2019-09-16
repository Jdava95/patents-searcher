const ProgramRegistry = require('../storage/ProgramRegistry');

module.exports = {
  /**
   * поиск по названию компании
   * @param {Object} obj 
   * @returns {Promise}
   */
  async getByHolders (obj) {
    return await ProgramRegistry.getByHolders(obj.name, obj.limit, obj.lastId);
  },

  /**
   * поиск по названию программы
   * @param {Object} obj 
   * @returns {Promise}
   */
  async getByProgram (obj) {
    return await ProgramRegistry.getByProgram(obj.name, obj.limit, obj.lastId);
  },

  /**
   * поиск по авторам программы
   * @param {Object} obj 
   * @returns {Promise}
   */
  async getByAuthors (obj) {
    return await ProgramRegistry.getByAuthors(obj.name, obj.limit, obj.lastId);
  },

    /**
   * поиск по номеру регистрации программы
   * @param {Object} obj 
   * @returns {Promise}
   */
  async getByRegNumber(obj) {
    return await ProgramRegistry.getByRegNumber(obj.number);
  },

    /**
   * поиск по авторам и названию программы
   * @param {Object} obj 
   * @returns {Promise}
   */
  async getInfo(obj) {
    return await ProgramRegistry.getInfo(obj.name, obj.limit, obj.countRec);
  }
}

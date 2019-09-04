const Patent = require('../storage/Patent');

module.exports = {

  /**
   * обращается к модулю патент к методу findByNameHolders
   * передает входыне параметры имя, лимит и последний id
   * @param {Object} obj 
   * @returns {Promise}
   */
  async getByRegNumber (obj) {
    return await Patent.getByRegNumber(obj.number);
  },

  /**
   * обращается к модулю патент к методу findByNameProgram
   * передает входыне параметры имя, лимит и последний id
   * @param {Object} obj 
   * @returns {Promise}
   */
  async getByInventionName (obj) {
    return await Patent.getByInventionName(obj.name, obj.limit, obj.lastId);
  },

  /**
   * обращается к модулю патент к методу findByAuthors
   * передает входыне параметры имя, лимит и последний id
   * @param {Object} obj 
   * @returns {Promise}
   */
  async getByAuthors (obj) {
    return await Patent.getByAuthors(obj.name, obj.limit, obj.lastId);
  }
}

const Patent = require('../storage/Patent');

module.exports = {

  /**
   * обращается к модулю патент к методу findByNameHolders
   * передает входыне параметры имя, лимит и последний id
   * @param {Object} obj 
   * @returns {Promise}
   */
  async findByNameHolders (obj) {
    return await Patent.findByNameHolders(obj.name, obj.limit, obj.lastId);
  },

  /**
   * обращается к модулю патент к методу findByNameProgram
   * передает входыне параметры имя, лимит и последний id
   * @param {Object} obj 
   * @returns {Promise}
   */
  async findByNameProgram (obj) {
    return await Patent.findByNameProgram(obj.name);
  },

  /**
   * обращается к модулю патент к методу findByAuthors
   * передает входыне параметры имя, лимит и последний id
   * @param {Object} obj 
   * @returns {Promise}
   */
  async findCompanyByAuthors (obj) {
    return await Patent.findByAuthors(obj.name, obj.limit);
  }
}

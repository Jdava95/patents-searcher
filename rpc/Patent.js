const Patent = require('../storage/Patent');

module.exports = {

  /**
   * обращается к модулю патент к методу findByNameHolders
   * передает входыне параметры имя, лимит и последний id
   * @param {Object} obj 
   * @returns {JSON} response 
   */
  async findCompanyByName (obj) {
    const response = await Patent.findByNameHolders(obj.name, obj.limit, obj.lastId);
    return response
  },

  /**
   * обращается к модулю патент к методу findByNameProgram
   * передает входыне параметры имя, лимит и последний id
   * @param {Object} obj 
   * @returns {JSON} response 
   */
  async findCompanyById (obj) {
    const response = await Patent.findByNameProgram(obj.name);
    return response;
  },

  /**
   * обращается к модулю патент к методу findByAuthors
   * передает входыне параметры имя, лимит и последний id
   * @param {Object} obj 
   * @returns {JSON} response 
   */
  async findCompanyByAuthors (obj) {
    const response = await Patent.findByAuthors(obj.name, obj.limit);
    return response;
  }
}

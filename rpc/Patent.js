const Patent = require('../storage/Patent');

module.exports = {
  async findCompanyByName (obj) {
    const resp = await Patent.findByNameHolders(obj.name, obj.limit, obj.lastId);
    return resp
  },

  async findCompanyById (obj) {
    const id = obj.id;
    console.info(id);
    const resp = await Patent.findById(id);
    return resp;
  }
}
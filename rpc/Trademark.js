const Trademark = require('../storage/Trademark');

module.exports = {
  async getByRightHolders(obj) {
    return await Trademark.getByRightHolders(obj.name , obj.limit, obj.lastId);
  },

  async getByRegNumber(obj) {
    console.info(obj.number)
    return await Trademark.getByRegNumber(obj.number)
  }
}
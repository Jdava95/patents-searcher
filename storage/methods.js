const mongoose = require('mongoose');
const Patent = mongoose.models.Patent;
const Version = mongoose.models.Version;


module.exports = {
  addPatent : async function(Object) {
    await Patent.create(Object);
  },

  findById : async function(id) {
    const response = await Patent.findById(id);
    return response;
  },

  getLastVersion : async function (url) {
    const response = await Version.findOne({url: url, actual: true}).exec();
    return response;
  },

  addNewUrl: async function (url) {
    await Version.findAndModify({actual: true}, {actual: false});
    await Version.create({url: url, actual: true});
  }
}

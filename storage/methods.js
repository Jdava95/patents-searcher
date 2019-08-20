const mongoose = require('mongoose');
const Patent = mongoose.models.Patent;

module.exports = {
    addPatent : async function(Object) {
    await Patent.create(Object);
  },

  findById : async function(id) {
    const response = await Patent.findById(id);
    return response;
  }
}

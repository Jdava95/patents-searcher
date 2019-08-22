const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const versionScheme = Schema ({
  url : {
    type: String,
    require: false,
    default: null
  },
  actual: {
    type: Boolean,
    require: false,
    default: null
  }
});

module.exports = mongoose.model('Version', versionScheme, 'Versions');
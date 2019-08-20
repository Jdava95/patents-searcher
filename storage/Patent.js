const storage = require('../default/storage');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patentSchema = Schema ({
  registrationNumber: {
    type: Number,
    require: false,
    default: null
  },
  registrationDate: {
    type: Number,
    require: false,
    default: null
  },
  applicationNumber: {
    type: Number,
    require: false,
    default: null
  },
  applicationDate: {
    type: Number,
    require: false,
    default: null
  },
  authors: {
    type: String,
    require: false,
    default: null
  },
  authorsCount: {
    type: Number,
    require: false,
    default: null
  },
  rightHolders: {
    type: String,
    require: false,
    default: null
  },
  contactToThirdParties: {
    type: String,
    require: false,
    default: null
  },
  programName: {
    type: String,
    require: false,
    default: null
  },
  creationYear: {
    type: Number,
    require: false,
    default: null
  },
  registrationPublishDate: {
    type: Number,
    require: false,
    default: null
  },
  registrationPublishNumber: {
    type: Number,
    require: false,
    default: null
  },
  actual: {
    type: Boolean,
    require: false,
    default: null
  },
  publicationURL: {
    type: String,
    require: false,
    default: null
  }
});

patentSchema.static('updateDoc', async function (options) {
  options.registrationNumber = options.registrationNumber ? parseInt(options.registrationNumber, 10) : null;
  options.registrationDate = options.registrationDate ? parseInt(options.registrationDate, 10) : null;
  options.applicationNumber = options.applicationNumber ? parseInt(options.applicationNumber, 10) : null;
  options.applicationDate = options.applicationDate ? parseInt(options.applicationDate, 10) : null;
  options.authorsCount = options.authorsCount ? parseInt(options.authorsCount, 10) : null;
  options.creationYear = options.creationYear ? parseInt(options.creationYear, 10) : null;
  options.registrationPublishDate = options.registrationPublishDate ? parseInt(options.registrationPublishDate, 10) : null;
  options.registrationPublishNumber = options.registrationPublishNumber ? parseInt(options.registrationPublishNumber, 10) : null;
  options.actual = options.actual === 'actual';
  return this.create(options);
})

module.exports = mongoose.model('Patent', patentSchema, storage.collection);

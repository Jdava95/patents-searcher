const defaultConfig = require('../default/storage');
const config = {};

function getStorageConfig() {
  try {
    const anotherConfig = require('../config/storage');
    return Object.assign(config, defaultConfig, anotherConfig);
  } catch(err) {
    console.log(err);
  }
}

module.exports = getStorageConfig;

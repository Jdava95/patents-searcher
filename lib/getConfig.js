const defaultConfig = require('../default/config');
const config = {};

function getConfig() {
  try {
    const anotherConfig = require('../config/config.js');
    return Object.assign(config, defaultConfig, anotherConfig);
  } catch(err) {
    console.log(err);
  }
}

module.exports = getConfig;
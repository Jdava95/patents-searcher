function getConfig(name) {
  const defaultConfig = require(`../default/${name}`);
  const config = {};
  try {
    const customtConfig = require(`../config/${name}`);
    return Object.assign(config, defaultConfig, customtConfig);
  } catch (error) {
    console.error(error);
    return defaultConfig;
  }
}

module.exports = getConfig;

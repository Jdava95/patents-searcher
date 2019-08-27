const defaultConfig = require('../default/config');
const config = {};

/**
 * Объединяет 2 конфигурационных файла
 * @returns {Object} возвращает объект
 */
function getConfig() {
  try {
    const anotherConfig = require('../config/config');
    return Object.assign(config, defaultConfig, anotherConfig);
  } catch(err) {
    console.error(err);
  }
}

module.exports = getConfig;

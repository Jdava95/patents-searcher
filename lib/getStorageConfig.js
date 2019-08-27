const defaultConfig = require('../default/storage');
const config = {};

/**
 * Объединяет 2 конфигурационных файла
 * @returns {Object} возвращает объект
 */
function getStorageConfig() {
  try {
    const anotherConfig = require('../config/storage');
    return Object.assign(config, defaultConfig, anotherConfig);
  } catch(err) {
    console.error(err);
  }
}

module.exports = getStorageConfig;

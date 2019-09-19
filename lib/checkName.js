const ALLOWED_CHARACTERS = /^[A-Za-zА-Яа-яё0-9«»”“’‘''"")(:.,\s\t\n—–-]+$/;

/**
 * проверяет строку на наличие запрещенных символов
 * @param {String} name
 * @returns {Boolean} 
 */  
function checkName(name) {
  return ALLOWED_CHARACTERS.test(name);
}

module.exports = checkName;

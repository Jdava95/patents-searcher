const moment = require('moment-timezone');
const DEFAULT_TIMEZONE = 'Europe/Moscow';


/**
 * Принимает строку делает сплит и возвращает массив
 * @param {String} value 
 * @returns {Array} result
 */
function splitAndConvert (value) {
  if(!value) return null;
  const splitArray = value.split('\r\n')
  const result = splitArray.map(function(el) {
    if(isNaN(el)) {
      return el;
    }
    
    const parsed = moment(el, 'YYYYMMDD').tz(DEFAULT_TIMEZONE);
    const date = new Date(+parsed);
    return date;
  });
  return result;
}

module.exports = splitAndConvert;

const moment = require('moment-timezone');
const DEFAULT_TIMEZONE = 'Europe/Moscow';

/**
 * Приведение числа в дату
 * @param {Number} value дата в целочисленном виде
 * @returns {Date} date возвращает дату в формате Date
 */
function convertDate(value) {
  if (!value) return null;
  const parsed = moment(value, 'YYYYMMDD').tz(DEFAULT_TIMEZONE);
  if (!parsed.isValid()) return null;
  const date = new Date(+parsed);
  return date;
}

module.exports = convertDate;

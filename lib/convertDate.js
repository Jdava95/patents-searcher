const moment = require('moment');

/**
 * Приведение числа в дату
 * @param {Int} value дата в целочисленном виде
 * @returns {Date} date возвращает дату в формате Date
 */
function convertDate(value) {
  if (!value) return null;
  const parsed = moment(value, 'YYYYMMDD');
  if (!parsed.isValid()) return null;
  const date = new Date(+parsed);
  return date;
}

module.exports = convertDate;

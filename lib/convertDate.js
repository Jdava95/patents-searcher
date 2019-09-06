const moment = require('moment');

function convertDate(value) {
  if (!value) return null;
  const parsed = moment(value, 'YYYYMMDD');
  if (!parsed.isValid()) return null;
  const date = new Date(+parsed);
  return date;
}

module.exports = convertDate;

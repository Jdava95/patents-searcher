const moment = require('moment');

function splitAndConvertDate(value) {
  if(!value) return null;
  const splitArray = value.split('\r\n')
  const result = splitArray.map(function(el){
    const parsed = moment(el, 'YYYYMMDD');
    const date = new Date(+parsed);
    return date
  })
  return result;
}

module.exports = splitAndConvertDate;
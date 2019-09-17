const moment = require('moment');

function splitAndConvert (value) {
  if(!value) return null;
  const splitArray = value.split('\r\n')
  const result = splitArray.map(function(el) {
    if(isNaN(el)) {
      return el;
    }
    
    const parsed = moment(el, 'YYYYMMDD');
    const date = new Date(+parsed);
    return date;
  });
  return result;
}

module.exports = splitAndConvert;

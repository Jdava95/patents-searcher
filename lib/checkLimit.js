const Limit = {
  MIN: 1,
  DEFAULT: 10,
  MAX: 20
}

/**
 * Проверяет входное число на соответствия требованиям
 * @param {Int} limit 
 * @return {Int} limit
 */
function checkLimit (limit) {
  if (!limit || !parseInt(limit, 10)) {
    limit = Limit.DEFAULT;
  } else if (parseInt(limit, 10) < Limit.MIN) {
    limit = Limit.MIN;
  } else if (parseInt(limit, 10) > Limit.MAX) {
    limit = Limit.MAX;
  }

  return limit;
}

module.exports = checkLimit;

const Limit = {
  MIN: 1,
  DEFAULT: 10,
  MAX: 20
}
const decimalSystemNumber = 10;

/**
 * Проверяет входное число на соответствия требованиям
 * @param {Int} limit максимальное число записей за вывол
 * @return {Int} limit
 */
function checkLimit (limit) {
  if (!limit || !parseInt(limit, decimalSystemNumber)) {
    limit = Limit.DEFAULT;
  } else if (parseInt(limit, decimalSystemNumber) < Limit.MIN) {
    limit = Limit.MIN;
  } else if (parseInt(limit, decimalSystemNumber) > Limit.MAX) {
    limit = Limit.MAX;
  }

  return limit;
}

module.exports = checkLimit;

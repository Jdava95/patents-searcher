const Limit = {
  MIN: 1,
  DEFAULT: 10,
  MAX: 20
}
const decimalSystemNumber = 10;

/**
 * Данная функция может быть использована для обработки параметра количества записей, 
 * чтобы получить число которое можно передать в .limit() при запросе
 * @param {Number} limit число записей за вывод
 * @return {Number} limit
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

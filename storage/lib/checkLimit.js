const Limit = {
  MIN: 1,
  DEFAULT: 10,
  MAX: 20
}
const DECIMAL_SYSTEM_NUMBER = 10;

/**
 * Данная функция может быть использована для обработки параметра количества записей, 
 * чтобы получить число которое можно передать в .limit() при запросе
 * @param {Number} limit число записей за вывод
 * @return {Number} limit
 */
function checkLimit(limit) {
  limit = parseInt(limit, DECIMAL_SYSTEM_NUMBER)
  if (!(limit || limit === 0)) {
    limit = Limit.DEFAULT;
  } else if (limit < Limit.MIN) {
    limit = Limit.MIN;
  } else if (limit > Limit.MAX) {
    limit = Limit.MAX;
  }

  return limit;
}

module.exports = checkLimit;

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
  const parsedLimit = parseInt(limit, DECIMAL_SYSTEM_NUMBER)
  if (!(parsedLimit && parsedLimit)) {
    limit = Limit.DEFAULT;
  } else if (parsedLimit < Limit.MIN) {
    limit = Limit.MIN;
  } else if (parsedLimit > Limit.MAX) {
    limit = Limit.MAX;
  }

  return limit;
}

module.exports = checkLimit;

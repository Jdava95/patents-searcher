/**
 * Производит поиск по регистрационному номеру
 * @param {Number} number 
 * @returns (Promise)
 */
function regNumSearcher(number) {
  return this.findOne({ registrationNumber: number }).exec();
}

module.exports = regNumSearcher;

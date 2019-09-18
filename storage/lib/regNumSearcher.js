/**
 * Производит поиск по регистрационному номеру
 * @param {Number} number 
 * @returns (Promise)
 */
function regNumSearcher(registrationNumber) {
  return this.findOne({ registrationNumber }).exec();
}

module.exports = regNumSearcher;

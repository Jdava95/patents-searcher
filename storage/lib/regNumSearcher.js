function regNumSearcher(number) {
  return this.findOne({ registrationNumber: number }).exec();
}

module.exports = regNumSearcher;

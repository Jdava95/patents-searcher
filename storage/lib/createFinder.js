const queryValidity = require('./queryValidity');
const checkLimit = require('./checkLimit');

function createFinder(fieldName) {
  return function(name, limit, lastId) {
    const query = queryValidity(fieldName, name, lastId);
    const size = checkLimit(limit);
    return this.find(query).limit(size).exec();
  }
}

module.exports = createFinder;

const checkLimit = require('./lib/checkLimit');

function fullTextSearcher(name, limit, countRec) {
  const size = checkLimit(limit);
  return this.find({ $text: { $search: name }}, { score: { $meta: 'textScore' } } )
    .sort({ score: { $meta: "textScore" } }).limit(size).skip(countRec).exec();
}

module.exports = fullTextSearcher;

const checkLimit = require('./checkLimit');

/**
 * Производит полнотекстную проверку по ФИО автора и наименованию товара.
 * @param {String} name 
 * @param {Number} limit 
 * @param {Number} countRec 
 * @returns {Promise}
 */
function fullTextSearcher(name, limit, countRec) {
  const size = checkLimit(limit);
  return this.find({ $text: { $search: name }}, { score: { $meta: 'textScore' } })
    .sort({ score: { $meta: "textScore" } })
    .limit(size)
    .skip(countRec)
    .exec();
}

module.exports = fullTextSearcher;

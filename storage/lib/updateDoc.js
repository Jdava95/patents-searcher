/**
 * принимает поток, добавляет или перезаписывает запись 
 * @param {Object} options 
 */
function updateDoc ({ registrationNumber }) {
  const query = { registrationNumber };
  return this.updateOne(query, { $set: query }, {
    upsert: true
  });
}

module.exports = updateDoc;

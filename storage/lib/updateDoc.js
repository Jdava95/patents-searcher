/**
 * принимает поток, добавляет или перезаписывает запись 
 * @param {Object} options 
 */
function updateDoc ( options ) {
  // const { registrationNumber } = options;
  return this.updateOne({
    registrationNumber: options.registrationNumber}, 
    options, {
    upsert: true
  });
}

module.exports = updateDoc;

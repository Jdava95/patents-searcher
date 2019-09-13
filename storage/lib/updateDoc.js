async function updateDoc(options) {
  return await this.updateOne({
    registrationNumber: options.registrationNumber
  }, options, {
    upsert: true
  })
}

module.exports = updateDoc;
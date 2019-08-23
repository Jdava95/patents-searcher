const mongoose = require('mongoose');
const Patent = mongoose.models.Patent;
const Version = mongoose.models.Version;

/**
 * Методы по работе с бд
 */
module.exports = {
  /**
   * Записать Object в коллекцию
   * @param {*} Object объект 
   */
  addPatent : async function(Object) {
    await Patent.create(Object);
  },
  /**
   * Получить данные из коллекции по id
   * @param {*} id 
   * @returns {response} возвращает промис объектов
   */
  findById : async function(id) {
    const response = await Patent.findById(id);
    return response;
  },

  /**
   * Найти запись в коллекции по актуальному url
   * @param {*} url 
   * @return {response} возвращает промис объекта
   */
  getLastVersion : async function (url) {
    const response = await Version.findOne({url: url, actual: true}).exec();
    return response;
  },

  /**
   * Найти актуальную запись по url и сделать её не актуальной
   * Добавить новую запись и сделать еэ актуальной
   * @param {*} url 
   */
  addNewUrl: async function (url) {
    await Version.findAndModify({actual: true}, {actual: false});
    await Version.create({url: url, actual: true});
  }
}

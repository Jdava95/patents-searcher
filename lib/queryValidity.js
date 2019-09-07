const mongoose = require('mongoose');
/**
 * Проверяет на валидность входные параметры
 * И возвращает query соответствующему методу
 * @param {String} method 
 * @param {String} name 
 * @param {String} lastId 
 * @return {Object} query возвращает объект для запроса
 */
function queryValidity (method, name, lastId) {
  const regex = new RegExp(name, 'i');
  let query = {};

  switch (method) {
    case 'rightHolders':
      query = {
        rightHolders: regex
      }
      break;
    case 'authors':
      query = {
        authors: regex
      }
      break;
    case 'nameProgram':
      query = {
        programName: regex
      }
      break;
    case 'rightHolderName':
      query = {
        rightHolderName: regex
      }
      break;
    case 'inventionName' : 
      query = {
        inventionName: regex
      }
      break;
    default:
      break;
  }

  if (lastId && mongoose.Types.ObjectId.isValid(lastId)) {
    query._id = {
      $gt: mongoose.Types.ObjectId(lastId)
    };
  }

  return query;
}

module.exports = queryValidity;

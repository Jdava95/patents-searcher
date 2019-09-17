 /**
  * ProgramRegistry, Trademark, Patent написаны с большой буквы потому что,
  * в файле scripts/networkUpdate.js имеется строка let url = config[process.argv[2]];
  * где мы присваиваем переменной url значение которое находится в config
  * котороя ссылается на этот ключ взависимости от того какой параметр был передан
  * из переменного окружения.
  * А так же let Model = require(`../storage/${process.argv[2]}.js`);
  * где идет присвоение переменной Model , require модели переданной нам
  * из переменного окружения.
  */
 
 module.exports = {
   port: 3000,
   bind: 'localhost',
   ProgramRegistry: 'https://rupto.ru/opendata/7730176088-evm',
   Trademark: 'https://rupto.ru/opendata/7730176088-tz',
   Patent: 'https://rupto.ru/opendata/7730176088-iz'
 }
